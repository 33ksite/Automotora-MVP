"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Vehicle } from "@/types";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

/**
 * Maps brand+model combinations to visually coherent Unsplash images.
 * Uses direct mapping for known inventory, with a deterministic hash fallback.
 */
const getFallbackImage = (brand: string, model: string, type: string, id: string) => {
  const key = `${brand.toLowerCase()}_${model.toLowerCase()}`;

  // Direct mapping: each model gets a visually coherent image
  const modelImages: Record<string, string> = {
    "fiat_strada":
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2574",
    "toyota_hilux":
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=2566",
    "chevrolet_onix":
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670",
    "volkswagen_gol":
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2670",
    "renault_logan":
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=2672",
  };

  if (modelImages[key]) return modelImages[key];

  // Type-based fallback
  const typeImages: Record<string, string> = {
    truck:
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=2566",
    pickup:
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=2566",
    suv:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2671",
    car:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2670",
  };

  if (typeImages[type]) return typeImages[type];

  // Hash fallback for unknown vehicles
  const fallbacks = [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2670",
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2670",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2670",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=2672",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2670",
  ];

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return fallbacks[Math.abs(hash) % fallbacks.length];
};

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  let imageUrl = getFallbackImage(vehicle.brand, vehicle.model, vehicle.type, vehicle.id);

  if (vehicle.image_url) {
    if (vehicle.image_url.startsWith('http')) {
      imageUrl = vehicle.image_url;
    } else {
      imageUrl = `https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/object/public/vehicles/${encodeURIComponent(vehicle.image_url)}`;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="group bg-white border border-gray-100 hover:border-accent transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        <Image
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Technical Top Labels */}
        <div className="absolute top-0 left-0 flex flex-col gap-0.5">
          <div className="bg-accent text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-br-lg">
            {vehicle.brand}
          </div>
          {vehicle.mileage === 0 && (
            <div className="bg-primary text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-br-md">
              NUEVO 0KM
            </div>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tighter text-foreground uppercase leading-none">
              {vehicle.model}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {vehicle.version || vehicle.type}
            </p>
          </div>
        </div>

        {/* Info Grid (Minimal) */}
        <div className="grid grid-cols-2 gap-y-2 border-y border-gray-50 py-4 my-2">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-gray-500">
            <span className="text-accent">MIL:</span> {vehicle.mileage.toLocaleString("es-UY")} KM
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-gray-500">
            <span className="text-accent">AÑO:</span> {vehicle.year}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-gray-500">
            <span className="text-accent">COMB:</span> {vehicle.fuel_type || "N/A"}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-gray-500">
            <span className="text-accent">TRAN:</span> {vehicle.transmission?.substring(0, 3) || "MAN"}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Precio Final</p>
            <p className="text-2xl font-black text-primary tracking-tight">
              {vehicle.currency} {vehicle.price.toLocaleString("es-UY")}
            </p>
          </div>

          <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 border border-gray-100 hover:bg-primary hover:text-white hover:border-primary transition-all group-hover:border-primary">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
