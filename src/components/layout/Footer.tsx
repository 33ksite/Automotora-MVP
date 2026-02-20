"use client"

import * as React from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export function Footer() {
  const [isOpenNow, setIsOpenNow] = React.useState(false)

  React.useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    const day = now.getDay()
    // Open Mon-Sat (1-6), 9am - 7pm
    if (day >= 1 && day <= 6 && hour >= 9 && hour < 19) {
      setIsOpenNow(true)
    }
  }, [])

  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">

        {/* Top Section: Newsletter & Branding */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 border-b border-white/10 pb-12">
           <div className="max-w-md space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tight">LUXE AUTO</h2>
              <p className="text-muted-foreground leading-relaxed">
                Elevando la experiencia automotriz. Curamos los mejores vehículos del mundo para quienes exigen excelencia.
              </p>
              <div className="flex items-center gap-2 text-sm text-gold mt-4">
                 <CheckCircle2 className="h-4 w-4" />
                 <span>Concesionario de Calidad Certificada</span>
              </div>
           </div>

           <div className="w-full max-w-sm space-y-4">
              <h3 className="font-medium text-lg">Suscríbete a nuestro Newsletter</h3>
              <p className="text-sm text-muted-foreground">Recibe ofertas exclusivas y alertas de nuevo inventario.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                 <Input
                   type="email"
                   placeholder="Ingresa tu email"
                   className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold"
                 />
                 <Button type="submit" variant="secondary" className="whitespace-nowrap">
                    Suscribirse <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
              </form>
           </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

           {/* Inventory Links */}
           <div className="space-y-6">
              <h4 className="font-bold text-lg">Inventario</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                 <li><Link href="/catalog?bodyType=SUV" className="hover:text-gold transition-colors">SUVs de Lujo</Link></li>
                 <li><Link href="/catalog?bodyType=Coupe" className="hover:text-gold transition-colors">Coupés Deportivos</Link></li>
                 <li><Link href="/catalog?fuelType=Electric" className="hover:text-gold transition-colors">Vehículos Eléctricos</Link></li>
                 <li><Link href="/catalog?condition=New" className="hover:text-gold transition-colors">Nuevas Llegadas</Link></li>
                 <li><Link href="/catalog?condition=Certified+Pre-Owned" className="hover:text-gold transition-colors">Certificados</Link></li>
              </ul>
           </div>

           {/* Services Links */}
           <div className="space-y-6">
              <h4 className="font-bold text-lg">Servicios</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                 <li><Link href="#" className="hover:text-gold transition-colors">Financiamiento</Link></li>
                 <li><Link href="#" className="hover:text-gold transition-colors">Vende tu Auto</Link></li>
                 <li><Link href="#" className="hover:text-gold transition-colors">Búsqueda de Vehículos</Link></li>
                 <li><Link href="#" className="hover:text-gold transition-colors">Consignación</Link></li>
                 <li><Link href="#" className="hover:text-gold transition-colors">Centro de Servicio</Link></li>
              </ul>
           </div>

           {/* Contact Info */}
           <div className="space-y-6">
              <h4 className="font-bold text-lg">Contáctanos</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                 <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold shrink-0" />
                    <span>1234 Premium Blvd,<br />Beverly Hills, CA 90210</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold shrink-0" />
                    <span>+1 (555) 123-4567</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold shrink-0" />
                    <span>concierge@luxeauto.com</span>
                 </li>
              </ul>
           </div>

           {/* Hours & Map Placeholder */}
           <div className="space-y-6">
              <h4 className="font-bold text-lg flex items-center gap-2">
                 Visita el Showroom
                 {isOpenNow ? (
                    <span className="inline-flex items-center rounded-full bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                       Abierto Ahora
                    </span>
                 ) : (
                    <span className="inline-flex items-center rounded-full bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                       Cerrado
                    </span>
                 )}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                 <div className="flex justify-between">
                    <span>Lun - Sab</span>
                    <span>9:00 AM - 7:00 PM</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Con Cita Previa</span>
                 </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-32 w-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors">
                 <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Beverly+Hills,CA&zoom=14&size=400x200&sensor=false')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500" />
                 <Button variant="outline" size="sm" className="relative z-10 bg-black/50 border-white/20 text-white backdrop-blur-sm group-hover:bg-gold group-hover:text-black group-hover:border-gold">
                    Cómo llegar
                 </Button>
              </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-xs text-muted-foreground">
           <p>&copy; {new Date().getFullYear()} LuxeAuto Inc. Todos los derechos reservados.</p>
           <div className="flex items-center gap-6">
              <Link href="/admin" className="hover:text-white transition-colors">Panel Admin</Link>
              <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
              <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
              <div className="flex items-center gap-4 ml-4">
                 <Link href="#" className="hover:text-gold transition-colors"><Facebook className="h-4 w-4" /></Link>
                 <Link href="#" className="hover:text-gold transition-colors"><Twitter className="h-4 w-4" /></Link>
                 <Link href="#" className="hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></Link>
              </div>
           </div>
        </div>
      </div>
    </footer>
  )
}
