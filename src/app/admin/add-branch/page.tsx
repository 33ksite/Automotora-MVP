// src/app/admin/add-branch/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { createBranch } from "@/app/actions/branch"
import { CheckCircle, ArrowLeft, MapPin } from "lucide-react"

const branchSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  email: z.string().email("Email inválido"),
  schedule: z.string().min(1, "El horario es requerido"),
  // Coordinates could be added here if we had a map picker
})

type BranchFormValues = z.infer<typeof branchSchema>

export default function AddBranchPage() {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      schedule: "Lun - Vie: 9:00 - 19:00, Sab: 10:00 - 14:00"
    }
  })

  const onSubmit: SubmitHandler<BranchFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await createBranch(data)
      if (result.success) {
        setIsSuccess(true)
        reset()
      } else {
        alert("Error: " + result.error)
      }
    } catch (error) {
        console.error(error)
      alert("Error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="bg-card p-12 rounded-2xl shadow-xl text-center max-w-md w-full border border-border/50">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">¡Sucursal Agregada!</h2>
          <p className="text-muted-foreground mb-8">
            La nueva ubicación ha sido registrada correctamente.
          </p>
          <div className="flex flex-col gap-4">
             <Button onClick={() => setIsSuccess(false)} className="w-full">
               Agregar Otra Sucursal
             </Button>
             <Button variant="outline" asChild className="w-full">
               <Link href="/admin">Volver al Panel</Link>
             </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="text-white/60 hover:text-white pl-0 mb-4 hover:bg-transparent">
             <Link href="/admin"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Panel</Link>
          </Button>
          <h1 className="text-4xl font-serif font-bold">Agregar Sucursal</h1>
          <p className="text-white/60 mt-2">Registra una nueva ubicación física para la red de concesionarios.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 max-w-2xl mx-auto">
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="space-y-2">
                 <Label htmlFor="name">Nombre de la Sucursal</Label>
                 <Input id="name" {...register("name")} placeholder="ej. LuxeAuto Vitacura" />
                 {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" {...register("city")} placeholder="ej. Santiago" />
                    {errors.city && <span className="text-xs text-destructive">{errors.city.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" {...register("phone")} placeholder="+56 2 2345 6789" />
                    {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                 </div>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="address">Dirección</Label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" {...register("address")} className="pl-9" placeholder="Av. Principal 1234, Local 5" />
                 </div>
                 {errors.address && <span className="text-xs text-destructive">{errors.address.message}</span>}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="email">Correo de Contacto</Label>
                 <Input id="email" type="email" {...register("email")} placeholder="sucursal@luxeauto.com" />
                 {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="schedule">Horario de Atención</Label>
                 <Input id="schedule" {...register("schedule")} />
                 {errors.schedule && <span className="text-xs text-destructive">{errors.schedule.message}</span>}
              </div>

              <div className="pt-4 border-t border-border/50">
                 <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Registrar Sucursal"}
                 </Button>
              </div>

           </form>
        </div>
      </div>
    </div>
  )
}
