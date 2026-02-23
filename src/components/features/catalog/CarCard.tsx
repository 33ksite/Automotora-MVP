"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Car } from "@/types/automotive"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Gauge, Fuel, Calendar, MessageSquare } from "lucide-react"
import { useChat } from "@/lib/context/ChatContext"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const { addMessage, setIsChatOpen } = useChat();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-lg">
      <Link href={`/catalog/${car.slug}`} className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {car.condition === 'New' && <Badge variant="premium">New 2025</Badge>}
          {car.stockStatus === 'Sold' && <Badge variant="destructive">Sold</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 gap-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground line-clamp-1">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-muted-foreground text-sm">{car.bodyType} • {car.color}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/50 text-xs text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <Gauge className="h-4 w-4 text-accent" />
            <span>{car.mileage.toLocaleString('en-US')} mi</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Fuel className="h-4 w-4 text-accent" />
            <span>{car.engine.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Calendar className="h-4 w-4 text-accent" />
            <span>{car.year}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-medium">Price</span>
            <span className="text-xl font-bold text-primary">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: car.currency, maximumFractionDigits: 0 }).format(car.price)}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="border border-border/50 text-foreground hover:bg-muted"
              onClick={(e) => {
                e.preventDefault();
                setIsChatOpen(true);
                addMessage(`Me interesa obtener más información sobre el ${car.year} ${car.make} ${car.model}. ¿Podrían ayudarme?`, 'user');
              }}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href={`/catalog/${car.slug}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
