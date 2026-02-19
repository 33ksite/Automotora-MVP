"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, User, Car } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/catalog", label: "Inventory" },
  { href: "#", label: "Services" },
  { href: "#", label: "Experience" },
  { href: "#", label: "Owners" },
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
          ? "bg-background/90 backdrop-blur-md shadow-sm py-4 border-b border-border/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-tighter text-foreground z-50 relative"
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
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  scrolled ? "text-foreground" : "text-foreground"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
            <Button asChild variant="premium" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
              <Link href="/catalog">
                 <Car className="mr-2 h-4 w-4" /> Browse Stock
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-primary/10 rounded-full transition-colors z-50 relative"
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
            className="md:hidden fixed inset-0 bg-background z-40 overflow-hidden flex flex-col pt-24 pb-8 px-6"
          >
            <div className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-3xl font-serif font-medium border-b border-border/30 pb-4 text-foreground hover:text-primary transition-colors flex justify-between items-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-auto">
               <Button asChild className="w-full bg-primary text-primary-foreground py-6 text-lg">
                  <Link href="/catalog" onClick={() => setIsOpen(false)}>
                    View Inventory
                  </Link>
               </Button>
               <Button variant="outline" className="w-full py-6 text-lg border-primary text-primary">
                  Sign In
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
