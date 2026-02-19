"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"

export interface VehicleMetric {
  label: string
  value: string
  unit: string
}

export interface VehicleMetricsBarProps {
  metrics: VehicleMetric[]
}

export function VehicleMetricsBar({ metrics }: VehicleMetricsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <GlassCard
           key={index}
           className="flex flex-col items-center justify-center py-6 text-center group transition-colors hover:border-accent/50"
           hover
        >
          <motion.span
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: index * 0.1 + 0.2 }}
             className="text-3xl font-bold font-serif text-foreground group-hover:text-accent transition-colors"
          >
            {metric.value}
          </motion.span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1 font-medium">
            {metric.label} <span className="opacity-50">({metric.unit})</span>
          </span>
        </GlassCard>
      ))}
    </div>
  )
}
