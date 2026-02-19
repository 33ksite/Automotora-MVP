import * as React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCarBySlug, getRelatedCars } from "@/lib/mock-db"
import { ProductGallery } from "@/components/features/product/ProductGallery"
import { ProductSpecs } from "@/components/features/product/ProductSpecs"
import { ReservationForm } from "@/components/features/product/ReservationForm"
import { LoanCalculator } from "@/components/features/product/LoanCalculator"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, Share2, Heart, Phone, Calendar } from "lucide-react"
import { CarCard } from "@/components/features/catalog/CarCard"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const car = await getCarBySlug(slug)

  if (!car) {
    notFound()
  }

  const relatedCars = await getRelatedCars(slug)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumb / Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" asChild className="pl-0 text-muted-foreground hover:text-foreground">
          <Link href="/catalog">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Inventory
          </Link>
        </Button>
      </div>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header Mobile (Visible only on small screens) */}
            <div className="lg:hidden space-y-2">
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline">{car.year}</Badge>
                 <Badge variant="secondary">{car.bodyType}</Badge>
                 {car.condition === 'New' && <Badge variant="premium">New Arrival</Badge>}
              </div>
              <h1 className="text-3xl font-serif font-bold text-foreground">{car.make} {car.model}</h1>
              <p className="text-xl font-medium text-primary">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: car.currency, maximumFractionDigits: 0 }).format(car.price)}
              </p>
            </div>

            {/* Gallery */}
            <ProductGallery images={car.images} alt={`${car.make} ${car.model}`} />

            {/* Description */}
            <div className="prose prose-stone max-w-none">
              <h2 className="font-serif text-2xl font-bold text-foreground">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </div>

            {/* Specs */}
            <div className="border-t border-border/50 pt-8">
               <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Specifications</h2>
               <ProductSpecs car={car} />
            </div>

          </div>

          {/* Sidebar / Sticky Action Column */}
          <div className="lg:col-span-1">
             <div className="hidden lg:block mb-6">
                <div className="flex items-center gap-2 mb-4">
                   <Badge variant="outline">{car.year}</Badge>
                   <Badge variant="secondary">{car.bodyType}</Badge>
                   {car.condition === 'New' && <Badge variant="premium">New Arrival</Badge>}
                </div>
                <h1 className="text-4xl font-serif font-bold text-foreground leading-tight">{car.make} {car.model}</h1>
                <div className="flex items-end justify-between mt-6 pb-6 border-b border-border/50">
                   <div>
                      <p className="text-sm text-muted-foreground uppercase font-medium mb-1">Price</p>
                      <p className="text-3xl font-bold text-primary">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: car.currency, maximumFractionDigits: 0 }).format(car.price)}
                      </p>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="icon" title="Save to Favorites">
                         <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" title="Share">
                         <Share2 className="h-5 w-5" />
                      </Button>
                   </div>
                </div>
             </div>

             <div className="sticky top-24 space-y-6">
                <ReservationForm car={car} />

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full gap-2 h-12 border-primary/20 hover:bg-primary/5">
                        <Phone className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full gap-2 h-12 border-primary/20 hover:bg-primary/5">
                        <Calendar className="h-4 w-4" /> Test Drive
                    </Button>
                </div>

                <LoanCalculator vehiclePrice={car.price} currency={car.currency} />
             </div>
          </div>
        </div>

        {/* Related Vehicles */}
        {relatedCars.length > 0 && (
          <div className="mt-20 border-t border-border/50 pt-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {relatedCars.map((relatedCar) => (
                  <CarCard key={relatedCar.id} car={relatedCar} />
               ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
