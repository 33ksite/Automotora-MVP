import * as React from "react"
import { Car } from "@/types/automotive"
import { Zap, Settings } from "lucide-react"

interface ProductSpecsProps {
  car: Car
}

export function ProductSpecs({ car }: ProductSpecsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Engine & Performance */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold">
          <Zap className="h-5 w-5 text-primary" /> Performance
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Engine</span>
            <span className="font-medium">{car.engine.type}</span>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Power</span>
            <span className="font-medium">{car.engine.horsepower} HP / {car.engine.torque} Nm</span>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">0-100 km/h</span>
            <span className="font-medium">{car.performance.acceleration}s</span>
          </div>
           <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Top Speed</span>
            <span className="font-medium">{car.performance.topSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Dimensions & Transmission */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-serif text-lg font-bold">
          <Settings className="h-5 w-5 text-primary" /> Technical
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
           <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Transmission</span>
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Drivetrain</span>
            <span className="font-medium">{car.driveType}</span>
          </div>
           <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Weight</span>
            <span className="font-medium">{car.dimensions.weight} kg</span>
          </div>
           <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <span className="block text-muted-foreground text-xs uppercase">Dimensions</span>
            <span className="font-medium text-xs">{car.dimensions.length}L x {car.dimensions.width}W</span>
          </div>
        </div>
      </div>

      {/* Key Features List */}
      <div className="md:col-span-2 pt-6 border-t border-border/50">
         <h3 className="font-serif text-lg font-bold mb-4">Key Features</h3>
         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8 list-disc list-inside text-sm text-muted-foreground marker:text-primary">
            {car.features.map((feature, i) => (
                <li key={i}>{feature}</li>
            ))}
         </ul>
      </div>
    </div>
  )
}
