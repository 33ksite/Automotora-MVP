import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { ChatProvider } from "@/lib/context/ChatContext";
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
  title: "LuxeAuto | Premium Vehicles",
  description: "Curated inventory of the world's finest automobiles.",
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
        <ChatProvider>
          <ConditionalWrapper>
            {children}
          </ConditionalWrapper>
        </ChatProvider>
      </body>
    </html>
  );
}
