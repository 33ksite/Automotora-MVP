"use client"

import * as React from "react"
import Link from "next/link"
import { Facebook, Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react"

const SHOWROOMS = [
   {
      name: "MONTEVIDEO",
      address: "Av. Agraciada 3324",
      phone: "091 838 500",
   },
   {
      name: "ROCHA",
      address: "Rambla Brava",
      phone: "098 227 0463",
   },
   {
      name: "LASCANO",
      address: "Avenida 1304",
      phone: "074 469 5264",
   },
]

const NAV_LINKS = [
   { label: "Catálogo 0KM", href: "/catalog" },
   { label: "Mejores Usados", href: "/catalog" },
   { label: "Gestión de Crédito", href: "#contacto" },
   { label: "Sobre Nosotros", href: "#" },
   { label: "Contacto", href: "#contacto" },
]

export function Footer() {
   return (
      <footer className="bg-white border-t border-gray-200">
         {/* Dynamic Upper Section */}
         <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
               {/* Brand Technical Identity */}
               <div className="lg:col-span-1 space-y-8">
                  <div className="space-y-4">
                     <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                        Dante<br />Automóviles
                     </h2>
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Concesionario Multimarca</p>
                  </div>
                  <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs">
                     Excelencia operativa y compromiso total con el cliente desde 1990. Red de sucursales en todo el país.
                  </p>
               </div>

               {/* Navigation Technical Stack */}
               <div className="space-y-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navegación / Stock</p>
                  <ul className="space-y-4">
                     {NAV_LINKS.map(link => (
                        <li key={link.label}>
                           <Link
                              href={link.href}
                              className="text-[11px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                           >
                              <ArrowRight className="h-3 w-3 -ml-5 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Logistics / Support */}
               <div className="space-y-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Atención Técnica</p>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Corporativo</p>
                        <a href="mailto:ventas@danteautomoviles.com.uy" className="text-xs font-bold hover:text-primary transition-colors">
                           ventas@danteautomoviles.com.uy
                        </a>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Asistencia 24/7</p>
                        <a href="https://wa.me/59891838500" className="text-xs font-bold hover:text-primary transition-colors flex items-center gap-2">
                           <MessageCircle className="h-3.5 w-3.5" /> Conectar WhatsApp
                        </a>
                     </div>
                  </div>
               </div>

               {/* Showroom Infrastructure */}
               <div className="space-y-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Sucursales</p>
                  <div className="space-y-4">
                     {SHOWROOMS.map(s => (
                        <div key={s.name} className="flex flex-col gap-1 border-l border-gray-100 pl-4 py-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-foreground">{s.name}</p>
                           <p className="text-[11px] text-gray-400 font-light">{s.address}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Brand Compliance Bar */}
         <div className="bg-gray-50 border border-gray-100 py-10 px-6 md:px-12 mx-6 md:mx-12 lg:mx-24 rounded-2xl">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               {["FIAT", "FORD", "JEEP", "BYD", "CHERY", "GEELY", "JAC"].map(b => (
                  <span key={b} className="text-xs font-black tracking-[0.4em]">{b}</span>
               ))}
            </div>
         </div>

         {/* Legal Technical Bar */}
         <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <div>© 2024 Dante Automóviles — Operación Uruguaya</div>
            <div className="flex gap-8">
               <Link href="#" className="hover:text-foreground transition-all">Privacidad</Link>
               <Link href="#" className="hover:text-foreground transition-all">Términos</Link>
               <Link href="#" className="hover:text-foreground transition-all">Cookies</Link>
            </div>
         </div>
      </footer>
   )
}
