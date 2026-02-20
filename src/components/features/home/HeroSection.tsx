import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Car, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Fondo de Auto de Lujo"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center animate-fade-in">
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          El Arte de la Excelencia Automotriz
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight max-w-4xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Experimenta lo <span className="text-gold italic">Extraordinario</span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.3s" }}>
          Descubre una colección curada de los vehículos más exclusivos del mundo.
          Rendimiento, lujo y sofisticación en cada detalle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button asChild size="lg" className="h-14 text-base font-medium bg-white text-black hover:bg-white/90 w-full sm:w-auto flex-1">
            <Link href="/catalog">
              Ver Inventario <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 text-base font-medium border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto flex-1 backdrop-blur-sm">
            <Link href="#sell-your-car">
              Vende tu Auto <Car className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/50" />
      </div>
    </section>
  )
}
