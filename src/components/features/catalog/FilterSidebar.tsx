"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Slider } from "@/components/ui/Slider"
import { Select } from "@/components/ui/Select"
import { X } from "lucide-react"

interface FilterSidebarProps {
  options: {
    makes: string[]
    bodyTypes: string[]
    colors: string[]
    fuelTypes: string[]
  }
}

export function FilterSidebar({ options }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- State Initialization ---

  // Multi-selects
  const [localMakes, setLocalMakes] = React.useState<string[]>(searchParams.getAll("make") || [])
  const [localBodyTypes, setLocalBodyTypes] = React.useState<string[]>(searchParams.getAll("bodyType") || [])
  const [localColors, setLocalColors] = React.useState<string[]>(searchParams.getAll("color") || [])
  const [localFuelTypes, setLocalFuelTypes] = React.useState<string[]>(searchParams.getAll("fuelType") || [])

  // Ranges
  const [priceMin, setPriceMin] = React.useState<string>(searchParams.get("minPrice") || "")
  const [priceMax, setPriceMax] = React.useState<string>(searchParams.get("maxPrice") || "")

  const [yearMin, setYearMin] = React.useState<string>(searchParams.get("minYear") || "")
  const [yearMax, setYearMax] = React.useState<string>(searchParams.get("maxYear") || "")

  const [mileageMax, setMileageMax] = React.useState<number>(
    searchParams.get("maxMileage") ? Number(searchParams.get("maxMileage")) : 100000
  )

  // Sync state with URL
  React.useEffect(() => {
    setLocalMakes(searchParams.getAll("make") || [])
    setLocalBodyTypes(searchParams.getAll("bodyType") || [])
    setLocalColors(searchParams.getAll("color") || [])
    setLocalFuelTypes(searchParams.getAll("fuelType") || [])

    setPriceMin(searchParams.get("minPrice") || "")
    setPriceMax(searchParams.get("maxPrice") || "")
    setYearMin(searchParams.get("minYear") || "")
    setYearMax(searchParams.get("maxYear") || "")
    setMileageMax(searchParams.get("maxMileage") ? Number(searchParams.get("maxMileage")) : 100000)
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()

    localMakes.forEach((make) => params.append("make", make))
    localBodyTypes.forEach((type) => params.append("bodyType", type))
    localColors.forEach((color) => params.append("color", color))
    localFuelTypes.forEach((fuel) => params.append("fuelType", fuel))

    if (priceMin) params.append("minPrice", priceMin)
    if (priceMax) params.append("maxPrice", priceMax)

    if (yearMin) params.append("minYear", yearMin)
    if (yearMax) params.append("maxYear", yearMax)

    if (mileageMax < 100000) params.append("maxMileage", mileageMax.toString())

    router.push(`/catalog?${params.toString()}`)
  }

  const clearFilters = () => {
    setLocalMakes([])
    setLocalBodyTypes([])
    setLocalColors([])
    setLocalFuelTypes([])
    setPriceMin("")
    setPriceMax("")
    setYearMin("")
    setYearMax("")
    setMileageMax(100000)
    router.push("/catalog")
  }

  const toggleSelection = (
    current: string[],
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(item)) {
      setter(current.filter((i) => i !== item))
    } else {
      setter([...current, item])
    }
  }

  // Generate years for select
  const currentYear = new Date().getFullYear() + 1
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i)

  return (
    <div className="flex flex-col gap-8 p-6 rounded-xl border border-border/50 bg-card sticky top-24 shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 sticky top-0 bg-card z-10">
        <h3 className="font-serif font-bold text-lg text-foreground">Refinar Búsqueda</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-destructive hover:bg-destructive/10 h-8 px-2 text-xs"
        >
          Limpiar Todo <X className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Rango de Precio</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        <Slider
          min={0}
          max={500000}
          step={5000}
          value={priceMax ? Number(priceMax) : 500000}
          onValueChange={(val) => setPriceMax(val.toString())}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$500k+</span>
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-4 border-t border-border/50 pt-6">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Año</h4>
        <div className="flex items-center gap-2">
           <div className="relative w-full">
              <Select value={yearMin} onChange={(e) => setYearMin(e.target.value)} className="h-9 text-sm w-full">
                <option value="">Min</option>
                {years.map(y => <option key={`min-${y}`} value={y}>{y}</option>)}
              </Select>
           </div>
           <span className="text-muted-foreground">-</span>
           <div className="relative w-full">
              <Select value={yearMax} onChange={(e) => setYearMax(e.target.value)} className="h-9 text-sm w-full">
                <option value="">Max</option>
                {years.map(y => <option key={`max-${y}`} value={y}>{y}</option>)}
              </Select>
           </div>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Combustible</h4>
        <div className="flex flex-col gap-3">
          {options.fuelTypes.map((fuel) => (
            <div key={fuel} className="flex items-center space-x-3 group">
              <Checkbox
                id={`fuel-${fuel}`}
                checked={localFuelTypes.includes(fuel)}
                onChange={() => toggleSelection(localFuelTypes, fuel, setLocalFuelTypes)}
                className="border-primary/50"
              />
              <Label
                htmlFor={`fuel-${fuel}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {fuel}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Mileage */}
      <div className="space-y-4 border-t border-border/50 pt-6">
        <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Kilometraje Máx</h4>
            <span className="text-xs font-mono text-muted-foreground">{mileageMax >= 100000 ? "Cualquiera" : `${mileageMax.toLocaleString()} km`}</span>
        </div>
        <Slider
          min={0}
          max={100000}
          step={1000}
          value={mileageMax}
          onValueChange={(val) => setMileageMax(val)}
        />
      </div>

      {/* Makes Filter */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Marca</h4>
        <div className="flex flex-col gap-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
          {options.makes.map((make) => (
            <div key={make} className="flex items-center space-x-3 group">
              <Checkbox
                id={`make-${make}`}
                checked={localMakes.includes(make)}
                onChange={() => toggleSelection(localMakes, make, setLocalMakes)}
                className="border-primary/50"
              />
              <Label
                htmlFor={`make-${make}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {make}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Body Types Filter */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Estilo de Carrocería</h4>
        <div className="flex flex-col gap-3">
          {options.bodyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-3 group">
              <Checkbox
                id={`type-${type}`}
                checked={localBodyTypes.includes(type)}
                onChange={() => toggleSelection(localBodyTypes, type, setLocalBodyTypes)}
                className="border-primary/50"
              />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

       {/* Colors Filter */}
      <div className="space-y-3 border-t border-border/50 pt-6">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Color</h4>
        <div className="flex flex-col gap-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
          {options.colors.map((color) => (
            <div key={color} className="flex items-center space-x-3 group">
              <Checkbox
                id={`color-${color}`}
                checked={localColors.includes(color)}
                onChange={() => toggleSelection(localColors, color, setLocalColors)}
                className="border-primary/50"
              />
              <Label
                htmlFor={`color-${color}`}
                className="text-sm font-normal cursor-pointer text-muted-foreground group-hover:text-primary transition-colors"
              >
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-auto sticky bottom-0 bg-card pb-2">
        <Button onClick={applyFilters} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
          Actualizar Resultados
        </Button>
      </div>
    </div>
  )
}
