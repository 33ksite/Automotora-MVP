import * as React from "react"
import { getAllCars, getUniqueFilters } from "@/lib/mock-db"
import { FilterSidebar } from "@/components/features/catalog/FilterSidebar"
import { ProductGrid } from "@/components/features/catalog/ProductGrid"
import { Badge } from "@/components/ui/Badge"
import { BodyType, FuelType } from "@/types/automotive"

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams

  // Parse filters
  const makeFilter = typeof params.make === 'string' ? [params.make] : (Array.isArray(params.make) ? params.make : undefined)
  const bodyTypeFilter = typeof params.bodyType === 'string' ? [params.bodyType] : (Array.isArray(params.bodyType) ? params.bodyType : undefined)
  const colorFilter = typeof params.color === 'string' ? [params.color] : (Array.isArray(params.color) ? params.color : undefined)
  const fuelFilter = typeof params.fuelType === 'string' ? [params.fuelType] : (Array.isArray(params.fuelType) ? params.fuelType : undefined)

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined

  const minYear = params.minYear ? Number(params.minYear) : undefined
  const maxYear = params.maxYear ? Number(params.maxYear) : undefined

  const minMileage = params.minMileage ? Number(params.minMileage) : undefined
  const maxMileage = params.maxMileage ? Number(params.maxMileage) : undefined

  // Fetch data
  const cars = await getAllCars({
    make: makeFilter,
    bodyType: bodyTypeFilter as BodyType[],
    color: colorFilter,
    fuelType: fuelFilter as FuelType[],
    priceRange: (minPrice !== undefined || maxPrice !== undefined) ? [minPrice || 0, maxPrice || 10000000] : undefined,
    yearRange: (minYear !== undefined || maxYear !== undefined) ? [minYear || 1900, maxYear || new Date().getFullYear() + 1] : undefined,
    mileageRange: (minMileage !== undefined || maxMileage !== undefined) ? [minMileage || 0, maxMileage || 1000000] : undefined,
  })

  const filterOptions = await getUniqueFilters()

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-8 border-b border-border/50">
        <div>
          <Badge variant="premium" className="mb-2">Full Inventory</Badge>
          <h1 className="text-4xl font-serif font-bold text-foreground">Explore Our Collection</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Discover a curated selection of the world&apos;s finest automobiles. From high-performance sports cars to luxurious SUVs.
          </p>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-foreground font-bold">{cars.length}</span> vehicles
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
             options={{
               makes: filterOptions.makes,
               bodyTypes: filterOptions.bodyTypes,
               colors: filterOptions.colors,
               fuelTypes: filterOptions.fuelTypes
             }}
          />
        </div>

        {/* Grid */}
        <div className="lg:col-span-3">
          <ProductGrid cars={cars} />
        </div>
      </div>
    </div>
  )
}
