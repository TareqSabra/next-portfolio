import type { Metadata } from "next";
import { Header } from "@portfolio/ui";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Premium Portfolio Monorepo",
  description:
    "A showcase of engineering excellence built with Next.js Multi-Zones microfrontends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={{ flex: 1, width: "100%" }}>{children}</main>
      </body>
    </html>
  );
}
