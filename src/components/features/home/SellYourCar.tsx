"use client"

import * as React from "react"
import { ArrowRight, CheckCircle, Wallet } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"

export function SellYourCar() {
  return (
    <section id="sell-your-car" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
               <Wallet className="h-4 w-4" />
               <span>Vender o Canjear</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
              Libera el Valor de tu Vehículo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experimenta un proceso de venta fluido, transparente y premium. Ya sea que estés actualizando o simplemente vendiendo,
              ofrecemos valoraciones competitivas basadas en datos de mercado en tiempo real.
            </p>

            <ul className="space-y-4">
              {[
                "Valoración Preliminar Instantánea",
                "Servicio de Recogida Concierge",
                "Pago el Mismo Día",
                "Especialistas en Compra de Leasing"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-gold shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Funnel Card */}
          <div className="bg-card p-8 rounded-2xl shadow-xl border border-border/50">
             <h3 className="text-2xl font-serif font-bold mb-6">Obtén tu Oferta</h3>
             <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Año</label>
                      <Select className="w-full">
                         <option>2024</option>
                         <option>2023</option>
                         <option>2022</option>
                         <option>Otro</option>
                      </Select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium">Marca</label>
                      <Select className="w-full">
                         <option>Porsche</option>
                         <option>BMW</option>
                         <option>Mercedes-Benz</option>
                         <option>Otro</option>
                      </Select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium">Modelo</label>
                   <Input placeholder="ej. 911 Carrera S" />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium">Kilometraje</label>
                   <Input type="number" placeholder="ej. 12,000" />
                </div>

                <div className="pt-2">
                   <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                      Obtener Valoración Instantánea <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground pt-4">
                   Sin compromiso. Tus datos están seguros.
                </p>
             </form>
          </div>

        </div>
      </div>
    </section>
  )
}
