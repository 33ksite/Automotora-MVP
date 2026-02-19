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
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(new Date().getFullYear() + 2),
  price: z.number().min(0),
  currency: z.string().default("USD"),
  mileage: z.number().min(0),
  condition: z.enum(["New", "Used", "Certified Pre-Owned"]),
  bodyType: z.enum(["SUV", "Sedan", "Coupe", "Convertible", "Hatchback", "Truck"]),
  color: z.string().min(1, "Color is required"),
  transmission: z.enum(["Automatic", "Manual", "CVT"]),
  driveType: z.enum(["RWD", "FWD", "AWD", "4WD"]),
  engine: z.object({
    type: z.string().min(1, "Engine type is required"),
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
  features: z.array(z.string()).min(1, "At least one feature is required"),
  images: z.array(z.string().url("Must be a valid URL")).min(1, "At least one image is required"),
  description: z.string().min(10, "Description is required"),
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
    resolver: zodResolver(vehicleSchema) as any,
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
      features: ["Leather Seats"],
      images: ["https://images.unsplash.com/photo-1552519507-da8b1227ad4a?auto=format&fit=crop&w=800&q=80"],
      description: "",
      stockStatus: "In Stock",
    }
  })

  // Custom helper for simple string array (react-hook-form field array is complex for simple strings)
  const features = watch("features")
  const images = watch("images")

  const onSubmit: SubmitHandler<VehicleFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      // Server Action
      const result = await createVehicle(data)
      if (result.success) {
        setIsSuccess(true)
        reset()
        window.scrollTo(0, 0)
      } else {
        alert("Failed to create vehicle: " + result.error)
      }
    } catch (error) {
      console.error(error)
      alert("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper for adding features manually since FieldArray is overkill for strings sometimes
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
          <h2 className="text-3xl font-serif font-bold mb-4">Vehicle Added!</h2>
          <p className="text-muted-foreground mb-8">
            The vehicle has been successfully added to the inventory catalog.
          </p>
          <div className="flex flex-col gap-4">
             <Button onClick={() => setIsSuccess(false)} className="w-full">
               Add Another Vehicle
             </Button>
             <Button variant="outline" asChild className="w-full">
               <Link href="/catalog">View Inventory</Link>
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
             <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>
          <h1 className="text-4xl font-serif font-bold">Add New Vehicle</h1>
          <p className="text-white/60 mt-2">Enter the details below to list a new vehicle in the inventory.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Section: Basic Info */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
               <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Basic Information</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" {...register("make")} placeholder="e.g. Porsche" />
                    {errors.make && <span className="text-xs text-destructive">{errors.make.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" {...register("model")} placeholder="e.g. 911 GT3" />
                    {errors.model && <span className="text-xs text-destructive">{errors.model.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" {...register("year", { valueAsNumber: true })} />
                    {errors.year && <span className="text-xs text-destructive">{errors.year.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
                    {errors.price && <span className="text-xs text-destructive">{errors.price.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input id="mileage" type="number" {...register("mileage", { valueAsNumber: true })} />
                    {errors.mileage && <span className="text-xs text-destructive">{errors.mileage.message}</span>}
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="color">Exterior Color</Label>
                    <Input id="color" {...register("color")} placeholder="e.g. Arctic Grey" />
                    {errors.color && <span className="text-xs text-destructive">{errors.color.message}</span>}
                 </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    rows={4}
                    placeholder="Describe the vehicle's condition, history, and key selling points..."
                  />
                  {errors.description && <span className="text-xs text-destructive">{errors.description.message}</span>}
               </div>
            </div>

            {/* Section: Technical Specs */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
               <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Technical Specifications</h3>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <Label>Engine Type</Label>
                    <Input {...register("engine.type")} placeholder="e.g. 4.0L Flat-6" />
                 </div>
                 <div className="space-y-2">
                    <Label>Horsepower</Label>
                    <Input type="number" {...register("engine.horsepower", { valueAsNumber: true })} />
                 </div>
                 <div className="space-y-2">
                    <Label>Torque (Nm)</Label>
                    <Input type="number" {...register("engine.torque", { valueAsNumber: true })} />
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <Label>Acceleration (0-100 km/h)</Label>
                    <Input type="number" step="0.1" {...register("performance.acceleration", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Top Speed (km/h)</Label>
                    <Input type="number" {...register("performance.topSpeed", { valueAsNumber: true })} />
                  </div>
               </div>

               <h4 className="font-medium text-sm pt-4">Dimensions (mm/kg)</h4>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-1"><Label className="text-xs">Length</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.length", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Width</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.width", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Height</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.height", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Wheelbase</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.wheelbase", { valueAsNumber: true })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Weight</Label><Input type="number" className="h-8 text-xs" {...register("dimensions.weight", { valueAsNumber: true })} /></div>
               </div>
            </div>

            {/* Section: Features & Visuals */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 space-y-6">
                <h3 className="font-serif font-bold text-xl border-b border-border/50 pb-4">Features & Gallery</h3>

                {/* Features */}
                <div className="space-y-4">
                   <Label>Key Features</Label>
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
                        placeholder="Add a feature (e.g. Heated Seats)"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      />
                      <Button type="button" variant="outline" onClick={handleAddFeature}><Plus className="h-4 w-4" /></Button>
                   </div>
                   {errors.features && <span className="text-xs text-destructive">{errors.features.message}</span>}
                </div>

                {/* Images */}
                <div className="space-y-4 pt-6 border-t border-border/50">
                   <Label>Image URLs</Label>
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
                        placeholder="https://example.com/image.jpg"
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
                <h3 className="font-serif font-bold text-lg">Classification</h3>

                <div className="space-y-2">
                   <Label>Stock Status</Label>
                   <Select {...register("stockStatus")}>
                      <option value="In Stock">In Stock</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Condition</Label>
                   <Select {...register("condition")}>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Body Type</Label>
                   <Select {...register("bodyType")}>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Truck">Truck</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Fuel Type</Label>
                   <Select {...register("engine.fuelType")}>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Transmission</Label>
                   <Select {...register("transmission")}>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                   </Select>
                </div>

                <div className="space-y-2">
                   <Label>Drivetrain</Label>
                   <Select {...register("driveType")}>
                      <option value="AWD">AWD</option>
                      <option value="RWD">RWD</option>
                      <option value="FWD">FWD</option>
                      <option value="4WD">4WD</option>
                   </Select>
                </div>

                <div className="pt-4 border-t border-border/50">
                   <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Listing"}
                   </Button>
                </div>
             </div>
          </div>

        </form>
      </div>
    </div>
  )
}
