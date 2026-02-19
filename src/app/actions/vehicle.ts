// src/app/actions/vehicle.ts
"use server"

import { z } from "zod"
import { Car } from "@/types/automotive"
import { revalidatePath } from "next/cache"

// Same schema as the client, but for server-side validation
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

type CreateVehicleResponse = {
  success: boolean
  message?: string
  error?: string
  data?: Car
}

export async function createVehicle(data: unknown): Promise<CreateVehicleResponse> {
  // 1. Simulate Network Delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // 2. Validate Data
    const validatedData = vehicleSchema.parse(data)

    // 3. Transform / Enrich Data (e.g. generate Slug, ID)
    const slug = `${validatedData.make}-${validatedData.model}-${validatedData.year}`.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const id = Math.random().toString(36).substring(2, 15)

    const newVehicle: Car = {
      id,
      slug,
      ...validatedData,
    } as Car // Type assertion because schema validation guarantees structure, but TS might be picky about strict string literals vs strings

    // 4. "Persist" Data (In a real app, save to DB. Here, we log it.)
    console.log("--- NEW VEHICLE CREATED ---")
    console.log(JSON.stringify(newVehicle, null, 2))

    // In a real app with a DB, we would insert it here.
    // Since we are using a static mock-db file, we can't write to it at runtime in Vercel/Next.js easily without a real DB.
    // However, for the purpose of this demo, we return success.

    // 5. Revalidate Paths (To clear cache if we were reading from a real DB)
    revalidatePath("/catalog")
    revalidatePath("/")

    return { success: true, message: "Vehicle created successfully", data: newVehicle }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed: " + error.issues.map(e => e.message).join(", ") }
    }
    return { success: false, error: "Failed to create vehicle" }
  }
}
