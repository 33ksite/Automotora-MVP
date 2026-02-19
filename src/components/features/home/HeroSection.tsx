import * as React from "react"
import { HeroContent } from "./HeroContent"
import { HeroShowcase } from "./HeroShowcase"
import { VehicleMetricsBar } from "./VehicleMetricsBar"
import { VideoTeaserSection } from "./VideoTeaserSection"

const metrics = [
  { label: "Torque", value: "700", unit: "Nm" },
  { label: "Aceleración", value: "4.3", unit: "s 0-100" },
  { label: "Velocidad", value: "250", unit: "km/h" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col gap-16">

        {/* Main Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            <HeroContent />
            <div className="hidden lg:block">
              <VehicleMetricsBar metrics={metrics} />
            </div>
          </div>

          {/* Right Column - Showcase */}
          <div className="relative order-1 lg:order-2">
             <HeroShowcase />
          </div>
        </div>

        {/* Mobile Metrics (Visible only on mobile/tablet) */}
        <div className="lg:hidden">
          <VehicleMetricsBar metrics={metrics} />
        </div>

        {/* Bottom Section */}
        <div className="w-full max-w-5xl mx-auto pb-12">
           <VideoTeaserSection />
        </div>

      </div>
    </section>
  )
}
