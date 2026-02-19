"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#", label: "Modelos" },
  { href: "#", label: "Compra Online" },
  { href: "#", label: "Servicios" },
  { href: "#", label: "Mundo Rover" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen
          ? "bg-background/80 backdrop-blur-md shadow-sm py-4 border-b border-border/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "text-2xl font-serif font-bold tracking-tighter transition-colors",
              scrolled || isOpen ? "text-foreground" : "text-foreground" // Always foreground (Eclipse) as background is light
            )}
          >
            RANGE ROVER
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  scrolled ? "text-foreground" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="premium" size="sm" className="bg-eclipse text-white hover:bg-eclipse/90">
              Configurar
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-accent/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[60px] left-0 right-0 bg-background border-t border-border/50 z-40 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-serif font-medium border-b border-border/30 pb-4 text-foreground hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 mt-auto pb-24">
                 <Button variant="outline" className="flex-1 border-eclipse text-eclipse hover:bg-eclipse hover:text-white">
                  Iniciar Sesión
                 </Button>
                 <Button variant="premium" className="flex-1 bg-eclipse text-white hover:bg-eclipse/90">
                  Configurar
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
