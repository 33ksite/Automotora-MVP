import * as React from "react"
import { supabase } from "@/lib/supabase"
import { FilterSidebar } from "@/components/features/catalog/FilterSidebar"
import { ProductGrid } from "@/components/features/catalog/ProductGrid"
import { Badge } from "@/components/ui/Badge"

export const revalidate = 0;

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams

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

  let query = supabase.from("vehicles").select("*").eq('available', true)

  if (makeFilter && makeFilter.length > 0) query = query.in('brand', makeFilter)
  if (bodyTypeFilter && bodyTypeFilter.length > 0) {
    const dbTypes = bodyTypeFilter.map(t => {
      const typeStr = typeof t === 'string' ? t.toLowerCase() : '';
      if (typeStr === 'sedan' || typeStr === 'hatchback' || typeStr === 'coupe') return 'car';
      return typeStr;
    });
    query = query.in('type', dbTypes);
  }
  if (fuelFilter && fuelFilter.length > 0) query = query.in('fuel_type', fuelFilter)
  if (colorFilter && colorFilter.length > 0) query = query.in('color', colorFilter)

  if (minPrice !== undefined) query = query.gte('price', minPrice)
  if (maxPrice !== undefined) query = query.lte('price', maxPrice)
  if (minYear !== undefined) query = query.gte('year', minYear)
  if (maxYear !== undefined) query = query.lte('year', maxYear)
  if (minMileage !== undefined) query = query.gte('mileage', minMileage)
  if (maxMileage !== undefined) query = query.lte('mileage', maxMileage)

  const { data: dbVehicles } = await query.order('created_at', { ascending: false })

  const typeMapInvert: Record<string, string> = { 'truck': 'Truck', 'suv': 'SUV', 'car': 'Sedan' }

  const cars = (dbVehicles || []).map(v => {
    let rawOptions: any[] = []
    try { rawOptions = typeof v.extra_data === "string" ? JSON.parse(v.extra_data) : (v.extra_data || []) } catch (e) { }

    let imageUrl = v.image_url || "/placeholder-car.jpg"
    if (v.image_url && !v.image_url.startsWith('http')) {
      imageUrl = `https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/object/public/vehicles/${encodeURIComponent(v.image_url)}`
    }

    return {
      id: v.id,
      slug: v.id,
      make: v.brand,
      model: `${v.model} ${v.version || ''}`.trim(),
      year: v.year,
      price: v.price,
      currency: v.currency,
      mileage: v.mileage,
      condition: v.mileage === 0 ? "New" : "Used",
      bodyType: typeMapInvert[v.type] || "Sedan",
      color: v.color || "N/A",
      transmission: v.transmission,
      driveType: "FWD",
      engine: { type: "N/A", horsepower: 0, torque: 0, fuelType: v.fuel_type || "Gasoline" },
      performance: { acceleration: 0, topSpeed: 0 },
      dimensions: { length: 0, width: 0, height: 0, wheelbase: 0, weight: 0 },
      features: rawOptions,
      images: [imageUrl],
      description: "",
      stockStatus: "In Stock"
    } as any
  });

  const { data: allVehicles } = await supabase.from("vehicles").select("brand, type, color, fuel_type").eq('available', true)

  const makes = Array.from(new Set((allVehicles || []).map(v => v.brand).filter(Boolean)))
  const bodyTypes = Array.from(new Set((allVehicles || []).map(v => typeMapInvert[v.type] || "Sedan").filter(Boolean)))
  const colors = Array.from(new Set((allVehicles || []).map(v => v.color).filter(Boolean)))
  const fuelTypes = Array.from(new Set((allVehicles || []).map(v => v.fuel_type).filter(Boolean)))

  const filterOptions = { makes, bodyTypes, colors, fuelTypes }

  return (
    <div className="container mx-auto px-4 pt-32 pb-8 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-8 border-b border-border/50">
        <div>
          <Badge variant="premium" className="mb-2">Inventario Completo</Badge>
          <h1 className="text-4xl font-serif font-bold text-foreground">Explora Nuestra Colección</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Descubre una selección curada de los mejores automóviles del mundo. Desde autos deportivos de alto rendimiento hasta lujosos SUVs.
          </p>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Mostrando <span className="text-foreground font-bold">{cars.length}</span> vehículos
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
