import type { Metadata } from "next";
import { Header } from "@portfolio/ui";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Analytics Dashboard | Project Showcase",
  description: "Microfrontend project showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard Project", href: "/dashboard" },
  ];

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header links={navLinks} currentPath="/dashboard" />
        <main style={{ marginTop: "100px", padding: "0 40px", flex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
