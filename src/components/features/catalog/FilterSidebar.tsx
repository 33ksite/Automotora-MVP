"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/Checkbox"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { X } from "lucide-react"

interface FilterSidebarProps {
  options: {
    makes: string[]
    bodyTypes: string[]
    colors: string[]
  }
}

export function FilterSidebar({ options }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL params
  const [localMakes, setLocalMakes] = React.useState<string[]>(
    searchParams.getAll("make") || []
  )
  const [localBodyTypes, setLocalBodyTypes] = React.useState<string[]>(
    searchParams.getAll("bodyType") || []
  )
  const [localColors, setLocalColors] = React.useState<string[]>(
    searchParams.getAll("color") || []
  )

  // Sync state with URL when URL changes (e.g. back button)
  React.useEffect(() => {
    setLocalMakes(searchParams.getAll("make") || [])
    setLocalBodyTypes(searchParams.getAll("bodyType") || [])
    setLocalColors(searchParams.getAll("color") || [])
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()

    // Preserve other params if needed, or start fresh. Here we build fresh.
    localMakes.forEach((make) => params.append("make", make))
    localBodyTypes.forEach((type) => params.append("bodyType", type))
    localColors.forEach((color) => params.append("color", color))

    router.push(`/catalog?${params.toString()}`)
  }

  const clearFilters = () => {
    setLocalMakes([])
    setLocalBodyTypes([])
    setLocalColors([])
    router.push("/catalog")
  }

  // Toggle helper
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

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl border border-border/50 bg-card sticky top-24 shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <h3 className="font-serif font-bold text-lg text-foreground">Filters</h3>
        {(localMakes.length > 0 || localBodyTypes.length > 0 || localColors.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive hover:bg-destructive/10 h-8 px-2"
          >
            Clear All <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Makes Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Brand</h4>
        <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
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
        <h4 className="font-medium text-sm text-foreground uppercase tracking-wider">Body Style</h4>
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
        <div className="flex flex-col gap-3">
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

      <div className="pt-6 mt-auto">
        <Button onClick={applyFilters} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
          Update Results
        </Button>
      </div>
    </div>
  )
}
