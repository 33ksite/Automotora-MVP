"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Gauge, Fuel, Zap, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Vehicle } from "@/types"
import { useChat } from "@/lib/context/ChatContext"

interface FeaturedVehiclesProps {
    vehicles: Vehicle[];
}

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
    const [filter, setFilter] = React.useState<"0KM" | "Usados">("0KM");

    const filteredVehicles = React.useMemo(() => {
        return vehicles.filter(v =>
            filter === "0KM" ? v.mileage === 0 : v.mileage > 0
        ).slice(0, 5);
    }, [vehicles, filter]);

    return (
        <section className="space-y-16">
            {/* Header with Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-3">
                    <p className="text-secondary-foreground/40 font-black tracking-[0.3em] uppercase text-[10px]">Catálogo Seleccionado</p>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                        Destacados
                    </h2>
                </div>

                <div className="flex bg-white border border-gray-200 p-0 shadow-sm">
                    <button
                        onClick={() => setFilter("0KM")}
                        className={cn(
                            "px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                            filter === "0KM" ? "bg-primary text-white" : "text-gray-400 hover:text-foreground hover:bg-gray-50 border-r border-gray-200"
                        )}
                    >
                        Autos 0KM
                    </button>
                    <button
                        onClick={() => setFilter("Usados")}
                        className={cn(
                            "px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                            filter === "Usados" ? "bg-primary text-white" : "text-gray-400 hover:text-foreground hover:bg-gray-50"
                        )}
                    >
                        Usados
                    </button>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4">
                {filteredVehicles.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        {/* Main Featured Card */}
                        <motion.div
                            key={`${filter}-${filteredVehicles[0]?.id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:col-span-2 md:row-span-2 relative group bg-white border border-gray-100 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-500"
                        >
                            <FeaturedCard vehicle={filteredVehicles[0]} isLarge />
                        </motion.div>

                        {/* Smaller Cards */}
                        {filteredVehicles.slice(1, 5).map((vehicle, idx) => (
                            <motion.div
                                key={`${filter}-${vehicle.id}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: (idx + 1) * 0.05 }}
                                className="relative group bg-white border border-gray-100 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-500"
                            >
                                <FeaturedCard vehicle={vehicle} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="col-span-full h-96 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 text-xs font-black uppercase tracking-widest border border-dashed border-gray-200">
                        Sin resultados destacados
                    </div>
                )}
            </div>

            {/* View All Button */}
            <div className="flex justify-start">
                <Button size="lg" className="rounded-xl px-12 h-14 bg-accent hover:bg-accent/90 text-white text-xs font-black uppercase tracking-[0.2em] group border-none shadow-none">
                    Ver todos los {filter}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </section>
    )
}

function FeaturedCard({ vehicle, isLarge = false }: { vehicle: Vehicle; isLarge?: boolean }) {
    const { triggerAIMessage } = useChat();

    if (!vehicle) return null;

    let imageUrl = vehicle.image_url || "/placeholder-car.jpg";
    if (vehicle.image_url && !vehicle.image_url.startsWith('http')) {
        imageUrl = `https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/object/public/vehicles/${encodeURIComponent(vehicle.image_url)}`;
    }

    return (
        <div className="flex flex-col h-full group">
            {/* Image Section */}
            <div className={cn(
                "relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700",
                isLarge ? "h-[65%] md:h-[75%]" : "h-56"
            )}>
                <Image
                    src={imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Technical Label */}
                <div className="absolute top-0 left-0 bg-accent text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-br-lg">
                    {vehicle.brand}
                </div>

                {/* Info Overlay (Enhanced) */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 max-w-[80%]">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] text-white font-black uppercase tracking-tight rounded-md border border-white/10">
                        {vehicle.year}
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] text-white font-black uppercase tracking-tight rounded-md border border-white/10">
                        {vehicle.fuel_type}
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] text-white font-black uppercase tracking-tight rounded-md border border-white/10">
                        {vehicle.mileage === 0 ? '0KM' : `${vehicle.mileage.toLocaleString()} KM`}
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] text-white font-black uppercase tracking-tight rounded-md border border-white/10">
                        {vehicle.transmission?.substring(0, 3).toUpperCase() || 'MAN'}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={cn(
                "p-6 flex flex-col justify-between flex-grow",
                isLarge ? "md:p-10" : "p-6"
            )}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className={cn(
                            "font-black tracking-tighter text-foreground uppercase leading-tight",
                            isLarge ? "text-3xl md:text-4xl" : "text-lg"
                        )}>
                            {vehicle.brand} {vehicle.model}
                            <span className="block text-gray-400 text-[10px] font-medium tracking-normal mt-1 uppercase">{vehicle.version}</span>
                        </h3>
                    </div>
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-6">
                    <div className="space-y-1 text-left">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inversión Final</p>
                        <p className={cn(
                            "font-black text-primary",
                            isLarge ? "text-4xl" : "text-2xl"
                        )}>
                            {vehicle.currency} {vehicle.price.toLocaleString()}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg h-12 w-12 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn"
                        onClick={(e) => {
                            e.preventDefault();
                            triggerAIMessage(`¡Hola! Me interesó este auto: ${vehicle.year} ${vehicle.brand} ${vehicle.model}. ¿Podés contarme más?`);
                        }}
                    >
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
