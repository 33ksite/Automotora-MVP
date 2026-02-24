import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { ChatProvider } from "@/lib/context/ChatContext";
import { ChatWidget } from "@/components/features/chat/ChatWidget";
import "./globals.css";

const lexend = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dante Automóviles | Destino de Confianza",
  description: "Concesionario líder de vehículos nuevos y usados en Uruguay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${lexend.variable} font-lexend antialiased bg-background text-foreground selection:bg-primary/10`}
      >
        <ChatProvider>
          <ConditionalWrapper>
            {children}
          </ConditionalWrapper>
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
