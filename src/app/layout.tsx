import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingChatWidget } from "@/components/layout/FloatingChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Automotora MVP | Solución Premium de Gestión Automotriz",
  description: "Plataforma de vanguardia para la gestión y visualización de inventario automotriz con estética premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-accent/30`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <FloatingChatWidget />
      </body>
    </html>
  );
}
