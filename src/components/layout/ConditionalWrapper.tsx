"use client"

import { usePathname } from 'next/navigation'
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingChatWidget } from "@/components/layout/FloatingChatWidget"

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHiddenRoute = pathname === '/admin-concierge-chat'

    if (isHiddenRoute) {
        // For admin chat, we don't render Navbar, Footer, Floating widget, or the main min-h-screen container
        // Admin chat has its own h-screen full layout.
        return <>{children}</>
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <FloatingChatWidget />
        </>
    )
}
