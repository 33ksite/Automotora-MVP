import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/features/home/HeroSection"
import { ProductGrid } from "@/components/features/catalog/ProductGrid"
import { FinanceTeaser } from "@/components/features/home/FinanceTeaser"
import { SellYourCar } from "@/components/features/home/SellYourCar"
import { Button } from "@/components/ui/Button"
import { getAllCars } from "@/lib/mock-db"

export default async function Home() {
  // Fetch a few featured cars
  const featuredCars = (await getAllCars()).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Inventory Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
              <div className="max-w-2xl">
                 <span className="text-gold font-medium tracking-widest text-sm uppercase mb-2 block">Our Collection</span>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Curated Excellence</h2>
                 <p className="text-muted-foreground text-lg leading-relaxed">
                    Hand-picked selection of the most exclusive vehicles available for immediate delivery.
                 </p>
              </div>
              <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors h-12 px-6">
                 <Link href="/catalog">
                    View All Inventory <ArrowRight className="h-4 w-4" />
                 </Link>
              </Button>
           </div>

           <ProductGrid cars={featuredCars} />

           <div className="mt-12 text-center md:hidden">
              <Button asChild className="w-full bg-primary text-primary-foreground h-12">
                 <Link href="/catalog">Explore Full Catalog</Link>
              </Button>
           </div>
        </div>
      </section>

      {/* Finance & Services */}
      <FinanceTeaser />

      {/* Sell/Trade-In Funnel */}
      <SellYourCar />
    </div>
  )
}
