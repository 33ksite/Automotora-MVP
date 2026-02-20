// src/app/actions/branch.ts
"use server"

import { z } from "zod"

const branchSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  email: z.string().email("Email inválido"),
  schedule: z.string().min(1, "El horario es requerido"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
})

export async function createBranch(data: unknown) {
  // 1. Simulate Delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const validatedData = branchSchema.parse(data)

    // 2. "Persist" Data
    console.log("--- NEW BRANCH CREATED ---")
    console.log(JSON.stringify(validatedData, null, 2))

    return { success: true, message: "Sucursal creada exitosamente" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Error de validación: " + error.issues.map(e => e.message).join(", ") }
    }
    return { success: false, error: "Error al crear sucursal" }
  }
}
