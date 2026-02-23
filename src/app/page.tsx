import { supabase } from "@/lib/supabase";
import { Vehicle } from "@/types";
import { VehicleCard } from "@/components/ui/vehicle-card";

export const revalidate = 0; // Disable cache for demo since data might change

export default async function Home() {
  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq('available', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-24 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            Catálogo de Vehículos
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Explorá nuestra selección de vehículos premium. Modelos recientes, en excelente estado y con financiación a tu medida.
          </p>
        </header>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
            Error al cargar los vehículos. Por favor, intentá nuevamente más tarde.
          </div>
        )}

        {!error && (!vehicles || vehicles.length === 0) ? (
          <div className="py-24 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">No hay vehículos disponibles</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Actualmente no contamos con vehículos en inventario.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {vehicles?.map((vehicle: Vehicle, idx) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} priority={idx < 6} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
