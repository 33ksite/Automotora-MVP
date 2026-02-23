"use server"

import { Car } from "@/types/automotive"
import { addCarToDb, getAllCars } from "@/lib/mock-db"

export async function fetchCatalogCars(): Promise<Car[]> {
    return await getAllCars()
}

export async function createCatalogCar(carData: Partial<Car>): Promise<Car[]> {
    await addCarToDb(carData)
    return await getAllCars()
}
