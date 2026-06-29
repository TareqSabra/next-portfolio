import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_EMAIL = process.env.CONTACT_EMAIL || "";

function createTransporter() {
  if (!SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendVisitEmail(ip: string, userAgent?: string): Promise<void> {
  const transporter = createTransporter();
  if (!transporter || !NOTIFY_EMAIL) return;

  await transporter.sendMail({
    from: `"Portfolio Visitor" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `New portfolio visitor`,
    text: [
      `IP: ${ip}`,
      `Time: ${new Date().toISOString()}`,
      `User-Agent: ${userAgent || "N/A"}`,
    ].join("\n"),
    html: `
      <h2>New Portfolio Visitor</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">IP</td>
            <td style="padding:8px;font-family:monospace">${ip}</td></tr>
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">Time</td>
            <td style="padding:8px">${new Date().toISOString()}</td></tr>
        <tr><td style="padding:8px;color:#888;font-size:0.85rem">User-Agent</td>
            <td style="padding:8px;font-size:0.85rem">${userAgent || "N/A"}</td></tr>
      </table>
    `.trim(),
  });
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const isLocalhost =
    ip === "127.0.0.1" || ip === "::1" || ip === "localhost";

  if (!isLocalhost) {
    const userAgent = request.headers.get("user-agent") || undefined;
    sendVisitEmail(ip, userAgent).catch((err) =>
      console.error("Visit email failed:", err),
    );
  }

  return NextResponse.json({ logged: true });
}
