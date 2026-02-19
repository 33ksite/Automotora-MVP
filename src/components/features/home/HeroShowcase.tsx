"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { ShieldCheck, Zap } from "lucide-react"

export function HeroShowcase() {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center overflow-visible">

      {/* Abstract Background Shape - Diagonal Cut */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 right-[-50%] md:right-[-20%] w-[150%] md:w-[100%] h-full bg-primary -skew-x-12 rounded-bl-[100px] z-0 shadow-2xl origin-top-right"
      />

      {/* Main Car Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full h-full md:w-[120%] md:h-[90%] max-w-[900px]">
           <Image
             src="https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
             alt="New Range Rover Sport"
             fill
             className="object-contain drop-shadow-2xl"
             priority
             sizes="(max-width: 768px) 100vw, 50vw"
           />
        </div>
      </motion.div>

      {/* Floating Info Cards */}
      <motion.div
         initial={{ opacity: 0, y: 20, x: 20 }}
         animate={{ opacity: 1, y: 0, x: 0 }}
         transition={{ delay: 0.8 }}
         className="absolute top-[20%] right-4 md:right-10 z-20 hidden md:block"
      >
         <GlassCard className="flex items-center gap-3 pr-6" dark>
            <div className="p-2 bg-accent rounded-full text-white shadow-lg shadow-accent/20">
               <Zap className="h-5 w-5" />
            </div>
            <div>
               <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Mode</p>
               <p className="font-bold text-white">Sport Hybrid</p>
            </div>
         </GlassCard>
      </motion.div>

      <motion.div
         initial={{ opacity: 0, y: -20, x: -20 }}
         animate={{ opacity: 1, y: 0, x: 0 }}
         transition={{ delay: 1 }}
         className="absolute bottom-[20%] left-4 md:left-0 z-20 hidden md:block"
      >
         <GlassCard className="flex items-center gap-3 pr-6" dark>
            <div className="p-2 bg-green-500/20 rounded-full text-green-400 border border-green-500/30">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
               <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Safety</p>
               <p className="font-bold text-white">5-Star NCAP</p>
            </div>
         </GlassCard>
      </motion.div>
    </div>
  )
}
