import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-orange-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
