import * as React from "react"
import { Play } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"

export function VideoTeaserSection() {
  return (
    <div className="relative w-full h-32 md:h-48 rounded-xl overflow-hidden group cursor-pointer mt-8 shadow-2xl">
      <div className="absolute inset-0 bg-primary/20" />
      <img
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        alt="Range Rover Forest Experience"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 -z-10"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <GlassCard className="rounded-full p-4 backdrop-blur-md group-hover:scale-110 transition-transform duration-300 border-white/40">
           <Play className="h-6 w-6 text-white fill-white ml-1" />
        </GlassCard>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <span className="text-white font-serif text-lg font-medium drop-shadow-md bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          Explora lo Salvaje
        </span>
      </div>
    </div>
  )
}
