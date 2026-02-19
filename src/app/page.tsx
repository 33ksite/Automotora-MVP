import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/features/home/HeroSection"
import { ProductGrid } from "@/components/features/catalog/ProductGrid"
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
              <div className="max-w-2xl">
                 <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Curated Excellence</h2>
                 <p className="text-muted-foreground text-lg">
                    Hand-picked selection of the most exclusive vehicles available for immediate delivery.
                 </p>
              </div>
              <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                 <Link href="/catalog">
                    View All Inventory <ArrowRight className="h-4 w-4" />
                 </Link>
              </Button>
           </div>

           <ProductGrid cars={featuredCars} />

           <div className="mt-12 text-center md:hidden">
              <Button asChild className="w-full bg-primary text-primary-foreground">
                 <Link href="/catalog">Explore Full Catalog</Link>
              </Button>
           </div>
        </div>
      </section>

      {/* Trust/Services Teaser */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">Premium Concierge</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                     Personalized service from inquiry to delivery. We handle every detail so you can enjoy the drive.
                  </p>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">Certified Quality</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                     Every vehicle undergoes a rigorous 150-point inspection by factory-trained master technicians.
                  </p>
               </div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">Global Delivery</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                     Secure, enclosed transport to your doorstep, anywhere in the world. Fully insured and tracked.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
