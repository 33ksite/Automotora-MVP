"use client"

import * as React from "react"
import { ArrowRight, Calculator, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function FinanceTeaser() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

           <div className="max-w-2xl space-y-6">
              <span className="text-gold font-medium tracking-widest text-sm uppercase">Financial Services</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                 Tailored Financing Solutions
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
                 Secure your dream vehicle with competitive rates and flexible terms.
                 Our digital application process provides pre-approval in minutes,
                 allowing you to shop with confidence.
              </p>

              <div className="flex flex-wrap gap-8 pt-4">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                       <Calculator className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm">Payment Calculator</h4>
                       <p className="text-xs text-white/60">Estimate your monthly payments</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                       <BadgeCheck className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm">Instant Pre-Approval</h4>
                       <p className="text-xs text-white/60">No impact on credit score</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Button size="lg" className="bg-gold text-primary hover:bg-gold/90 shadow-xl shadow-gold/20 h-14 px-8 text-base">
                 Apply for Financing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base">
                 View Current Rates
              </Button>
           </div>

        </div>
      </div>
    </section>
  )
}
