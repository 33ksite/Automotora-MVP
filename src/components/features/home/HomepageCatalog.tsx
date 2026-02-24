"use client"

import * as React from "react"
import { Vehicle } from "@/types"
import { VehicleCard } from "@/components/ui/vehicle-card"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HomepageCatalogProps {
    vehicles: Vehicle[];
    fetchError: boolean;
    hasRealData: boolean;
}

const ITEMS_PER_PAGE = 6;

export function HomepageCatalog({ vehicles, fetchError, hasRealData }: HomepageCatalogProps) {
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentVehicles = vehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 space-y-12">
            <header className="space-y-4">
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full border border-primary/20">
                    {hasRealData ? "Inventario Real" : "Catálogo Dante"}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground font-serif">
                    Catálogo completo
                </h2>
            </header>

            {fetchError && !hasRealData && (
                <div className="p-4 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 text-sm font-medium">
                    Aviso: Usando datos de demostración mientras se configura la conexión a base de datos.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentVehicles.map((vehicle: Vehicle, idx) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} priority={idx < 3} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-12 border-t border-border/50">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="h-10 w-10 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 font-mono text-sm font-medium">
                        <span className="w-8 text-center">{currentPage}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="w-8 text-center text-muted-foreground">{totalPages}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="h-10 w-10 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}
