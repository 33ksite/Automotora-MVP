"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { ShieldCheck, Zap } from "lucide-react"

export function HeroShowcase() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-visible">

      {/* Abstract Background Shape - Diagonal Cut */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 right-[-60%] md:right-[-30%] lg:right-[-20%] w-[150%] md:w-[120%] h-full bg-eclipse -skew-x-12 rounded-bl-[100px] z-0 shadow-2xl origin-top-right opacity-90"
      />

      {/* Main Car Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full h-full md:w-[110%] md:h-[100%] max-w-[1000px]">
           <Image
             src="https://images.unsplash.com/photo-1754254013090-21573dc4e7d5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA=="
             alt="New Dark Green Range Rover"
             fill
             className="object-contain drop-shadow-2xl scale-110 md:scale-100"
             priority
             sizes="(max-width: 768px) 100vw, 60vw"
           />
        </div>
      </motion.div>

      {/* Floating Info Cards */}
      <motion.div
         initial={{ opacity: 0, y: 20, x: 20 }}
         animate={{ opacity: 1, y: 0, x: 0 }}
         transition={{ delay: 0.8 }}
         className="absolute top-[10%] right-2 md:right-10 z-20 hidden md:block"
      >
         <GlassCard className="flex items-center gap-3 pr-6 border-white/10 bg-eclipse/40 backdrop-blur-xl">
            <div className="p-2 bg-almond rounded-full text-eclipse shadow-lg shadow-almond/20">
               <Zap className="h-5 w-5" />
            </div>
            <div>
               <p className="text-xs text-almond/80 font-medium uppercase tracking-wider">Motor</p>
               <p className="font-bold text-white">V8 Biturbo</p>
            </div>
         </GlassCard>
      </motion.div>

      <motion.div
         initial={{ opacity: 0, y: -20, x: -20 }}
         animate={{ opacity: 1, y: 0, x: 0 }}
         transition={{ delay: 1 }}
         className="absolute bottom-[20%] left-4 md:left-[-20px] z-20 hidden md:block"
      >
         <GlassCard className="flex items-center gap-3 pr-6 border-white/10 bg-eclipse/40 backdrop-blur-xl">
            <div className="p-2 bg-matcha/20 rounded-full text-almond border border-matcha/30">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
               <p className="text-xs text-almond/80 font-medium uppercase tracking-wider">Garantía</p>
               <p className="font-bold text-white">5 Años Premium</p>
            </div>
         </GlassCard>
      </motion.div>
    </div>
  )
}
