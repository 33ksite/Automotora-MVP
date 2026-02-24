"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Search, User, Car } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/catalog", label: "Autos 0KM" },
  { href: "/catalog?condition=Used", label: "Usados" },
  { href: "/catalog?type=moto", label: "Motos" },
  { href: "#contacto", label: "Crédito" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled || isOpen || !isHome
          ? "bg-white border-b border-gray-100 py-4"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Technical Brand Name */}
          <Link
            href="/"
            className="text-xl font-black tracking-tighter uppercase z-50 relative group"
          >
            Dante <span className="text-primary">Automóviles</span>
            <div className="h-0.5 w-0 bg-primary absolute -bottom-1 left-0 transition-all group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative",
                  scrolled || !isHome ? "text-foreground" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className={cn("rounded-lg hover:bg-gray-100", (scrolled || !isHome) ? "text-foreground" : "text-white hover:text-foreground")}>
              <Search className="h-4 w-4" />
            </Button>
            <Button asChild className="bg-primary text-white rounded-lg px-8 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 shadow-none border-none ml-4">
              <Link href="/catalog">
                Catálogo
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors z-50 relative",
              scrolled || isOpen || !isHome ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Ultra-Minimalist Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-white z-40 flex flex-col pt-32 pb-12 px-12"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-4xl font-black uppercase tracking-tighter border-b border-gray-100 pb-6 text-foreground hover:text-primary transition-colors flex justify-between items-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  <X className="h-6 w-6 rotate-45 opacity-20 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <Button asChild className="w-full bg-primary text-white py-8 rounded-none text-xs font-black uppercase tracking-widest">
                <Link href="/catalog" onClick={() => setIsOpen(false)}>Explorar Inventario</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
