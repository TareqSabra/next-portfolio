import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";

const DATA_FILE = path.join(process.cwd(), "data", "visits.json");

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_EMAIL = process.env.CONTACT_EMAIL || "";

interface VisitEntry {
  ip: string;
  timestamp: string;
  userAgent?: string;
}

interface VisitStore {
  visits: VisitEntry[];
  notifiedIps: string[];
}

async function readStore(): Promise<VisitStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      visits: parsed.visits || [],
      notifiedIps: parsed.notifiedIps || [],
    };
  } catch {
    return { visits: [], notifiedIps: [] };
  }
}

async function writeStore(store: VisitStore): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

function createTransporter() {
  if (!SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendVisitEmail(entry: VisitEntry): Promise<void> {
  const transporter = createTransporter();
  if (!transporter || !NOTIFY_EMAIL) return;

  await transporter.sendMail({
    from: `"Portfolio Visitor" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New visitor to your portfolio`,
    text: [
      `IP: ${entry.ip}`,
      `Time: ${entry.timestamp}`,
      `User-Agent: ${entry.userAgent || "N/A"}`,
      ``,
      `View full log: ${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/visit/log` : "Local data/visits.json"}`,
    ].join("\n"),
    html: `
      <h2>New Portfolio Visitor</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">IP</td>
            <td style="padding:8px;font-family:monospace">${entry.ip}</td></tr>
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">Time</td>
            <td style="padding:8px">${entry.timestamp}</td></tr>
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">User-Agent</td>
            <td style="padding:8px;font-size:0.85rem">${entry.userAgent || "N/A"}</td></tr>
      </table>
    `.trim(),
  });
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const entry: VisitEntry = {
      ip,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    };

    const isLocalhost =
      ip === "127.0.0.1" || ip === "::1" || ip === "localhost";

    const store = await readStore();
    const isNewIp = !store.notifiedIps.includes(ip);

    store.visits.push(entry);
    await writeStore(store);

    if (isNewIp && !isLocalhost) {
      store.notifiedIps.push(ip);
      await writeStore(store);
      sendVisitEmail(entry).catch((err) =>
        console.error("Visit email failed:", err),
      );
    }

    return NextResponse.json({ logged: true, isNewIp });
  } catch (error) {
    console.error("Visit logging failed:", error);
    return NextResponse.json({ error: "Failed to log visit" }, { status: 500 });
  }
}
