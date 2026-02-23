"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Vehicle } from "@/types";
import { Calendar, Gauge, Cog, Fuel, Palette } from "lucide-react";

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
  const imageUrl = vehicle.image_url || getFallbackImage(vehicle.brand, vehicle.model, vehicle.type, vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {vehicle.year >= new Date().getFullYear() && (
          <div className="absolute top-3 left-3 rounded-full px-3 py-1 bg-white/90 dark:bg-black/90 text-xs font-semibold backdrop-blur-md text-zinc-900 dark:text-zinc-100">
            Nuevo
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-1">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium line-clamp-1">
              {vehicle.version || vehicle.type}
            </p>
          </div>
          <div className="text-right flex flex-col items-end shrink-0">
            {vehicle.operation && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 mb-1">
                {vehicle.operation === "rent" ? "Alquiler" : vehicle.operation === "sale" ? "Venta" : vehicle.operation}
              </span>
            )}
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {vehicle.currency} {vehicle.price.toLocaleString("es-UY")}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            <span>{vehicle.mileage.toLocaleString("es-UY")} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog className="w-3.5 h-3.5" />
            <span className="capitalize">{vehicle.transmission || "Manual"}</span>
          </div>
          {vehicle.fuel_type && (
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5" />
              <span className="capitalize">{vehicle.fuel_type}</span>
            </div>
          )}
          {vehicle.color && (
            <div className="col-span-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span className="capitalize">Color: {vehicle.color}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
