import * as React from "react"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export function HeroContent() {
  return (
    <div className="flex flex-col items-start gap-6 max-w-xl z-10 relative">
      <Badge variant="premium" className="mb-2 px-4 py-1 text-sm font-medium shadow-md">
        Nuevo Modelo 2025
      </Badge>

      <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight text-eclipse">
        New Range Rover <br />
        <span className="text-eclipse italic">Is A Thing Of Beauty</span>
      </h1>

      <p className="text-lg text-matcha max-w-md leading-relaxed font-medium">
        Redefiniendo el lujo moderno con un diseño minimalista, tecnología intuitiva y capacidades todoterreno incomparables.
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button size="lg" className="gap-2 shadow-xl shadow-eclipse/20 bg-eclipse text-white hover:bg-eclipse/90">
          Ordenar Ahora <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" className="gap-2 border-eclipse text-eclipse hover:bg-almond/10">
          <Play className="h-4 w-4" /> Ver Premiere
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-8 pt-8 border-t border-almond/30 w-full">
        <div className="flex -space-x-4">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-almond flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="h-full w-full object-cover opacity-80 mix-blend-multiply" />
             </div>
           ))}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
             <span className="font-bold text-eclipse">2000+</span>
             <span className="text-matcha text-sm">Reseñas Verificadas</span>
          </div>
          <div className="flex text-almond text-sm">★★★★★</div>
        </div>
      </div>
    </div>
  )
}
