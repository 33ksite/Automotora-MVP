// src/app/admin/add-vehicle/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { createVehicle } from "@/app/actions/vehicle"
import { CheckCircle, Plus, Trash2, ArrowLeft } from "lucide-react"

// Zod Schema (mirrors Car interface)
const vehicleSchema = z.object({
  make: z.string().min(1, "Marca es requerida"),
  model: z.string().min(1, "Modelo es requerido"),
  year: z.number().min(1900).max(new Date().getFullYear() + 2),
  price: z.number().min(0),
  currency: z.string().default("USD"),
  mileage: z.number().min(0),
  condition: z.enum(["New", "Used", "Certified Pre-Owned"]),
  bodyType: z.enum(["SUV", "Sedan", "Coupe", "Convertible", "Hatchback", "Truck"]),
  color: z.string().min(1, "Color es requerido"),
  transmission: z.enum(["Automatic", "Manual", "CVT"]),
  driveType: z.enum(["RWD", "FWD", "AWD", "4WD"]),
  engine: z.object({
    type: z.string().min(1, "Tipo de motor es requerido"),
    horsepower: z.number().min(0),
    torque: z.number().min(0),
    fuelType: z.enum(["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]),
  }),
  performance: z.object({
    acceleration: z.number().min(0),
    topSpeed: z.number().min(0),
  }),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
    wheelbase: z.number().min(0),
    weight: z.number().min(0),
  }),
  features: z.array(z.string()).min(1, "Al menos una característica es requerida"),
  images: z.array(z.string().url("Debe ser una URL válida")).min(1, "Al menos una imagen es requerida"),
  description: z.string().min(10, "Descripción es requerida"),
  stockStatus: z.enum(["In Stock", "Reserved", "Sold"]),
})

type VehicleFormValues = z.infer<typeof vehicleSchema>

export default function AddVehiclePage() {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema) as unknown as undefined, // Workaround for Resolver type mismatch
    defaultValues: {
      make: "",
      model: "",
      year: 2024,
      price: 0,
      currency: "USD",
      mileage: 0,
      condition: "New",
      bodyType: "SUV",
      color: "",
      transmission: "Automatic",
      driveType: "AWD",
      engine: { type: "", horsepower: 0, torque: 0, fuelType: "Gasoline" },
      performance: { acceleration: 0, topSpeed: 0 },
      dimensions: { length: 0, width: 0, height: 0, wheelbase: 0, weight: 0 },
      features: ["Asientos de Cuero"],
      images: ["https://images.unsplash.com/photo-1552519507-da8b1227ad4a?auto=format&fit=crop&w=800&q=80"],
      description: "",
      stockStatus: "In Stock",
    }
  })

  const features = watch("features")
  const images = watch("images")

  const onSubmit: SubmitHandler<VehicleFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await createVehicle(data)
      if (result.success) {
        setIsSuccess(true)
        reset()
        window.scrollTo(0, 0)
      } else {
        alert("Error al crear vehículo: " + result.error)
      }
    } catch (error) {
      console.error(error)
      alert("Ocurrió un error inesperado.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const [newFeature, setNewFeature] = React.useState("")
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setValue("features", [...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const [newImage, setNewImage] = React.useState("")
  const handleAddImage = () => {
    if (newImage.trim()) {
      setValue("images", [...images, newImage.trim()])
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
     setValue("images", images.filter((_, i) => i !== index))
  }

  const removeFeatureItem = (index: number) => {
     setValue("features", features.filter((_, i) => i !== index))
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="bg-card p-12 rounded-2xl shadow-xl text-center max-w-md w-full border border-border/50">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">¡Vehículo Agregado!</h2>
          <p className="text-muted-foreground mb-8">
            El vehículo ha sido agregado exitosamente al catálogo de inventario.
          </p>
          <div className="flex flex-col gap-4">
             <Button onClick={() => setIsSuccess(false)} className="w-full">
               Agregar Otro Vehículo
             </Button>
             <Button variant="outline" asChild className="w-full">
               <Link href="/catalog">Ver Inventario</Link>
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
          <h1 className="text-4xl font-serif font-bold">Agregar Nuevo Vehículo</h1>
          <p className="text-white/60 mt-2">Ingresa los detalles a continuación para listar un nuevo vehículo en el inventario.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Section: Basic Info */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
               <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Información Básica</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="make">Marca</Label>
                    <Input id="make" {...register("make")} placeholder="ej. Porsche" />
                    {errors.make && <span className="text-xs text-destructive">{errors.make.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input id="model" {...register("model")} placeholder="ej. 911 GT3" />
                    {errors.model && <span className="text-xs text-destructive">{errors.model.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Input id="year" type="number" {...register("year", { valueAsNumber: true })} />
                    {errors.year && <span className="text-xs text-destructive">{errors.year.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Precio (USD)</Label>
                    <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
                    {errors.price && <span className="text-xs text-destructive">{errors.price.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="mileage">Kilometraje (km)</Label>
                    <Input id="mileage" type="number" {...register("mileage", { valueAsNumber: true })} />
                    {errors.mileage && <span className="text-xs text-destructive">{errors.mileage.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="color">Color Exterior</Label>
                    <Input id="color" {...register("color")} placeholder="ej. Gris Ártico" />
                    {errors.color && <span className="text-xs text-destructive">{errors.color.message}</span>}
                 </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    rows={4}
                    placeholder="Describe la condición del vehículo, historial y puntos clave de venta..."
                  />
                  {errors.description && <span className="text-xs text-destructive">{errors.description.message}</span>}
               </div>
            </div>

            {/* Section: Technical Specs */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
               <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Especificaciones Técnicas</h3>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <Label>Tipo de Motor</Label>
                    <Input {...register("engine.type")} placeholder="ej. 4.0L Flat-6" />
                 </div>
                 <div className="space-y-2">
                    <Label>Caballos de Fuerza</Label>
                    <Input type="number" {...register("engine.horsepower", { valueAsNumber: true })} />
                 </div>
                 <div className="space-y-2">
                    <Label>Torque (Nm)</Label>
                    <Input type="number" {...register("engine.torque", { valueAsNumber: true })} />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label>Aceleración (0-100 km/h)</Label>
                    <Input type="number" step="0.1" {...register("performance.acceleration", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Velocidad Máxima (km/h)</Label>
                    <Input type="number" {...register("performance.topSpeed", { valueAsNumber: true })} />
                  </div>
               </div>

               <h4 className="font-medium text-sm pt-4">Dimensiones (mm/kg)</h4>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-1"><Label className="text-xs">Largo</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.length", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Ancho</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.width", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Alto</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.height", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Dist. Ejes</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.wheelbase", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Peso</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.weight", { valueAsNumber: true })} /></div>
               </div>
            </div>

            {/* Section: Features & Visuals */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
                <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Características y Galería</h3>

                {/* Features */}
                <div className="space-y-4">
                   <Label>Características Clave</Label>
                   <div className="flex flex-wrap gap-2 mb-2">
                      {features.map((feature, idx) => (
                        <div key={idx} className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                           {feature}
                           <button type="button" onClick={() => removeFeatureItem(idx)}><Trash2 className="h-3 w-3 text-destructive" /></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Agregar característica (ej. Asientos Calefactados)"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      />
                      <Button type="button" variant="outline" onClick={handleAddFeature}><Plus className="h-4 w-4" /></Button>
                   </div>
                   {errors.features && <span className="text-xs text-destructive">{errors.features.message}</span>}
                </div>

                {/* Images */}
                <div className="space-y-4 pt-6 border-t border-border/50">
                   <Label>URLs de Imágenes</Label>
                   <div className="space-y-2">
                      {images.map((url, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-2 rounded">
                           <span className="truncate flex-1">{url}</span>
                           <button type="button" onClick={() => removeImage(idx)}><Trash2 className="h-4 w-4 text-destructive" /></button>
                        </div>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <Input
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                      />
                      <Button type="button" variant="outline" onClick={handleAddImage}><Plus className="h-4 w-4" /></Button>
                   </div>
                   {errors.images && <span className="text-xs text-destructive">{errors.images.message}</span>}
                </div>
            </div>

          </div>

          {/* Sidebar: Status & Type */}
          <div className="space-y-8">
             <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50 space-y-6 sticky top-8">
                <h3 className="font-serif font-bold text-lg">Clasificación</h3>

                <div className="space-y-2">
                   <Label>Estado de Stock</Label>
                   <Select {...register("stockStatus")}>
                      <option value="In Stock">En Stock</option>
                      <option value="Reserved">Reservado</option>
                      <option value="Sold">Vendido</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Condición</Label>
                   <Select {...register("condition")}>
                      <option value="New">Nuevo</option>
                      <option value="Used">Usado</option>
                      <option value="Certified Pre-Owned">Certificado</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Carrocería</Label>
                   <Select {...register("bodyType")}>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedán</option>
                      <option value="Coupe">Coupé</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Truck">Camioneta</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Combustible</Label>
                   <Select {...register("engine.fuelType")}>
                      <option value="Gasoline">Gasolina</option>
                      <option value="Diesel">Diésel</option>
                      <option value="Electric">Eléctrico</option>
                      <option value="Hybrid">Híbrido</option>
                      <option value="Plug-in Hybrid">Híbrido Enchufable</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Transmisión</Label>
                   <Select {...register("transmission")}>
                      <option value="Automatic">Automática</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Tracción</Label>
                   <Select {...register("driveType")}>
                      <option value="AWD">AWD (Total)</option>
                      <option value="RWD">RWD (Trasera)</option>
                      <option value="FWD">FWD (Delantera)</option>
                      <option value="4WD">4WD (4x4)</option>
                   </Select>
                </div>

                <div className="pt-4 border-t border-border/50">
                   <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creando..." : "Crear Listado"}
                   </Button>
                </div>
             </div>
          </div>

        </form>
      </div>
    </div>
  )
}
