import { supabase } from "@/lib/supabase";
import { Vehicle } from "@/types";
import { VehicleCard } from "@/components/ui/vehicle-card";
import { HeroSlider } from "@/components/features/home/HeroSlider";
import { FeaturedVehicles } from "@/components/features/home/FeaturedVehicles";
import { ServicesSection } from "@/components/features/home/ServicesSection";
import { ContactSection } from "@/components/features/home/ContactSection";
import { BrandCarousel } from "@/components/features/home/BrandCarousel";

export const revalidate = 0; // Disable cache for demo since data might change

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "mock-1",
    tenant_id: "demo",
    brand: "Fiat",
    model: "Strada",
    type: "Truck",
    operation: "sale",
    version: "VOLCANO CVT",
    year: 2023,
    mileage: 12000,
    transmission: "Automatic",
    fuel_type: "Nafta",
    price: 21500,
    currency: "USD",
    color: "Gris Silverstone",
    image_url: "Fiat-Strada.jpeg",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-7",
    tenant_id: "demo",
    brand: "Toyota",
    model: "Hilux",
    type: "Truck",
    operation: "sale",
    version: "SRV 2.8",
    year: 2022,
    mileage: 45000,
    transmission: "Automatic",
    fuel_type: "Diesel",
    price: 48000,
    currency: "USD",
    color: "Blanco",
    image_url: "Toyota-Hilux.jpg",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-2",
    tenant_id: "demo",
    brand: "Fiat",
    model: "Fastback",
    type: "SUV",
    operation: "sale",
    version: "Limited Edition",
    year: 2024,
    mileage: 0,
    transmission: "Automatic",
    fuel_type: "Nafta",
    price: 28990,
    currency: "USD",
    color: "Negro Vulcano",
    image_url: "upload-1.webp",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-3",
    tenant_id: "demo",
    brand: "Fiat",
    model: "Toro",
    type: "Truck",
    operation: "sale",
    version: "Volcano 4x4",
    year: 2024,
    mileage: 0,
    transmission: "Automatic",
    fuel_type: "Diesel",
    price: 32990,
    currency: "USD",
    color: "Azul Jazz",
    image_url: "atfzj11ho7wsuaba3skvfv31j.jpg",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-4",
    tenant_id: "demo",
    brand: "Fiat",
    model: "Pulse",
    type: "SUV",
    operation: "sale",
    version: "Audace",
    year: 2024,
    mileage: 0,
    transmission: "CVT",
    fuel_type: "Nafta",
    price: 25500,
    currency: "USD",
    color: "Blanco",
    image_url: "d83af97963a12fa203a32b51f0d280e0.jpg",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-5",
    tenant_id: "demo",
    brand: "Fiat",
    model: "Argo",
    type: "Hatchback",
    operation: "sale",
    version: "Drive",
    year: 2024,
    mileage: 0,
    transmission: "Manual",
    fuel_type: "Nafta",
    price: 18200,
    currency: "USD",
    color: "Rojo Montecarlo",
    image_url: "7KbpMs0mMz5nJT1DKRwQGwBlTE7gYae85KJHmvXB.jpg",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  },
  {
    id: "mock-6",
    tenant_id: "demo",
    brand: "Volkswagen",
    model: "Amarok",
    type: "Truck",
    operation: "sale",
    version: "Highline",
    year: 2021,
    mileage: 0,
    transmission: "Automatic",
    fuel_type: "Diesel",
    price: 38500,
    currency: "USD",
    color: "Plata",
    image_url: "vw-polo-track.webp",
    available: true,
    extra_data: {},
    created_at: new Date().toISOString()
  }
];

export default async function Home() {
  let vehicles: Vehicle[] | null = null;
  let fetchError = false;

  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq('available', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching vehicles:", error);
      fetchError = true;
    } else {
      vehicles = data;
    }
  } catch (err) {
    console.error("Supabase connection failed:", err);
    fetchError = true;
  }

  // Fallback to mock data if no vehicles found (demo mode)
  const displayVehicles = (vehicles && vehicles.length > 0) ? vehicles : MOCK_VEHICLES;

  return (
    <main className="min-h-screen bg-background">
      {/* Full Width Hero Slider */}
      <HeroSlider />

      {/* Brand Partners Carousel */}
      <BrandCarousel />

      {/* Featured / Destacados - Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        <FeaturedVehicles vehicles={displayVehicles} />
      </div>

      {/* Services: Compra, Venta y Financiamiento */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Full Catalog Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 space-y-12">
        <header className="space-y-4">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full border border-primary/20">
            {vehicles && vehicles.length > 0 ? "Inventario Real" : "Catálogo Dante"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground font-serif">
            Catálogo completo
          </h2>
        </header>

        {fetchError && !vehicles && (
          <div className="p-4 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 text-sm font-medium">
            Aviso: Usando datos de demostración mientras se configura la conexión a base de datos.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayVehicles.map((vehicle: Vehicle, idx) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={idx < 6} />
          ))}
        </div>
      </div>
    </main>
  );
}
