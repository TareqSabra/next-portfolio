import type { Metadata } from "next";
import { Inter } from "next/font/google";
import KeyboardNav from "../components/KeyboardNav";
import { VisitNotify } from "../components/visit-notify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Tareq Sabra",
  description: "Tareq Sabra - Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="portfolio-body"
        style={{
          flexDirection: "row",
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(226, 155, 159, 0.06) 0%, transparent 60%), var(--bg-primary)",
        }}
      >
        <KeyboardNav />
        <VisitNotify />
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </body>
    </html>
  );
}
