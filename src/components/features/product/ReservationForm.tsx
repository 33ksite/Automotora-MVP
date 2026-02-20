"use client"

import * as React from "react"
import { Car } from "@/types/automotive"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, Send } from "lucide-react"

interface ReservationFormProps {
  car: Car
}

export function ReservationForm({ car }: ReservationFormProps) {
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => setIsSuccess(true), 1000)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50/50 border border-green-200 rounded-xl text-center animate-in fade-in zoom-in duration-500 h-full min-h-[400px]">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
           <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-green-900 mb-2">¡Consulta Enviada!</h3>
        <p className="text-green-800/80 mb-8 max-w-xs mx-auto">
          Un especialista se pondrá en contacto contigo pronto sobre el <span className="font-semibold">{car.model}</span>.
        </p>
        <Button
           variant="outline"
           className="border-green-600 text-green-700 hover:bg-green-100 w-full"
           onClick={() => setIsSuccess(false)}
        >
          Enviar Otra Consulta
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
       <div className="p-6 border-b border-border/50 bg-muted/20">
        <h3 className="font-serif font-bold text-xl text-foreground">Interés de Compra</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Completa el formulario para conectar con un asesor de ventas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input id="name" placeholder="Juan Pérez" required className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" placeholder="juan@ejemplo.com" required className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" placeholder="+56 9 1234 5678" className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje (Opcional)</Label>
          <textarea
            id="message"
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder={`Estoy interesado en el ${car.year} ${car.model}...`}
          />
        </div>

        <Button type="submit" size="lg" className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 shadow-lg shadow-primary/20">
          <Send className="h-4 w-4" /> Solicitar Información
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Al enviar, aceptas nuestra <a href="#" className="underline hover:text-primary">Política de Privacidad</a>.
        </p>
      </form>
    </div>
  )
}
