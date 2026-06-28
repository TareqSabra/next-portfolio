import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import QueryProvider from "../components/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Port Telemetry | Global Maritime Logistics Dashboard",
  description: "Active voyage tracking, port conditions, customs verification, and freight calculations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable, spaceGrotesk.variable, jetbrainsMono.variable)}>
      <body className="portfolio-body" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-primary)" }}>
        <QueryProvider>
          <a
            href="/"
            className="fixed top-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border-muted)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--text-primary)] shadow-lg transition-all duration-300 hover:border-[var(--accent-neon-blue)] hover:text-[var(--accent-neon-blue)] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] group"
            title="Back to Portfolio"
          >
            <ArrowLeft size={20} className="transition-transform duration-300 group-hover:translate-x-[-3px]" />
          </a>

          <main style={{ marginTop: "24px", padding: "80px 40px 40px 40px", flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

