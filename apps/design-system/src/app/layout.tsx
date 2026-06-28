import type { Metadata } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@portfolio/ui";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design System | UI Component Playground",
  description: "Live preview and prop manipulation of shared UI components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
