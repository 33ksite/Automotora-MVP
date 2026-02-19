import * as React from "react"
import { Car } from "@/types/automotive"
import { CarCard } from "./CarCard"

interface ProductGridProps {
  cars: Car[]
}

export function ProductGrid({ cars }: ProductGridProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-serif font-bold text-foreground">No matches found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters to find your perfect vehicle.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
