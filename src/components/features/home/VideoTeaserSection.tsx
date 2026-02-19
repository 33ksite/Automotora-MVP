"use client"

import * as React from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"

export function VideoTeaserSection() {
  return (
    <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden group cursor-pointer mt-8 shadow-2xl border border-white/20">
      <div className="absolute inset-0 bg-eclipse/30 z-10 transition-colors duration-500 group-hover:bg-eclipse/10" />

      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        alt="Range Rover Forest Experience"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 80vw"
      />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <GlassCard className="rounded-full p-4 backdrop-blur-md group-hover:scale-110 transition-transform duration-300 border-almond/40 bg-almond/20">
           <Play className="h-6 w-6 text-white fill-white ml-1" />
        </GlassCard>
      </div>

      <div className="absolute bottom-6 left-6 z-20">
        <span className="text-white font-serif text-xl tracking-wide font-medium drop-shadow-md">
          Explora lo Salvaje
        </span>
        <p className="text-almond text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ver Cinematic
        </p>
      </div>
    </div>
  )
}
