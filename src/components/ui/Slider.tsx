import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number
  max: number
  step?: number
  value: number
  onValueChange: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min, max, step = 1, value, onValueChange, ...props }, ref) => {
    const percentage = ((value - min) * 100) / (max - min)

    return (
      <div className="relative w-full h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-2 bg-secondary rounded-full overflow-hidden">
           {/* Filled track */}
           <div
             className="h-full bg-primary"
             style={{ width: `${percentage}%` }}
           />
        </div>

        {/* Thumb (Standard input styling over the visual track) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          className={cn(
            "absolute w-full h-full opacity-0 cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Visual Thumb */}
        <div
          className="pointer-events-none absolute h-5 w-5 bg-background border-2 border-primary rounded-full shadow-md transform -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
