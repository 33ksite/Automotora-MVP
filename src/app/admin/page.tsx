import Link from "next/link"
import { Car, Building2, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Panel de Administración</h1>
          <p className="text-white/60 mt-2">Gestiona el inventario y las sucursales de LuxeAuto.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Vehicles Card */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                   <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h2 className="text-2xl font-serif font-bold text-foreground">Vehículos</h2>
                   <p className="text-muted-foreground text-sm">Gestionar inventario de autos</p>
                </div>
             </div>
             <p className="text-muted-foreground mb-8">
                Agrega nuevos vehículos al catálogo, actualiza precios, especificaciones y galerías de fotos.
             </p>
             <div className="flex gap-4">
                <Button asChild className="flex-1 gap-2">
                   <Link href="/admin/add-vehicle">
                      <Plus className="h-4 w-4" /> Agregar Vehículo
                   </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                   <Link href="/catalog">
                      Ver Catálogo <ArrowRight className="h-4 w-4" />
                   </Link>
                </Button>
             </div>
          </div>

          {/* Branches Card */}
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow group">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                   <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                   <h2 className="text-2xl font-serif font-bold text-foreground">Sucursales</h2>
                   <p className="text-muted-foreground text-sm">Gestionar ubicaciones físicas</p>
                </div>
             </div>
             <p className="text-muted-foreground mb-8">
                Registra nuevas sucursales, actualiza horarios de atención y coordina la logística.
             </p>
             <div className="flex gap-4">
                <Button asChild className="flex-1 gap-2">
                   <Link href="/admin/add-branch">
                      <Plus className="h-4 w-4" /> Agregar Sucursal
                   </Link>
                </Button>
                {/* Future: View Branches List */}
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
