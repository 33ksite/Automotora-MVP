// src/lib/mock-db.ts
import { Car, FilterOptions, FuelType } from "@/types/automotive";

let cars: Car[] = [
  {
    id: "1",
    slug: "fiat-strada-freedom",
    make: "Fiat",
    model: "Strada Freedom 1.3",
    year: 2024,
    price: 19500,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "Truck",
    color: "Gris Silverstone",
    transmission: "Manual",
    driveType: "FWD",
    engine: {
      type: "1.3 Firefly",
      horsepower: 99,
      torque: 128,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 11.2,
      topSpeed: 165,
    },
    dimensions: {
      length: 4474,
      width: 1732,
      height: 1602,
      wheelbase: 2737,
      weight: 1174,
    },
    features: [
      "Dirección Eléctrica",
      "Aire Acondicionado",
      "Control de Tracción Plus",
      "4 Airbags",
      "Radio con Bluetooth",
    ],
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2574",
    ],
    description:
      "La pickup líder en ventas. Versatilidad extrema para el trabajo y el uso diario con la confiabilidad de Fiat.",
    stockStatus: "In Stock",
  },
  {
    id: "2",
    slug: "fiat-fastback-limited",
    make: "Fiat",
    model: "Fastback Limited Edition",
    year: 2024,
    price: 28990,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "SUV",
    color: "Negro Vulcano",
    transmission: "Automatic",
    driveType: "FWD",
    engine: {
      type: "1.3 Turbo 270",
      horsepower: 175,
      torque: 270,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 8.1,
      topSpeed: 210,
    },
    dimensions: {
      length: 4427,
      width: 1774,
      height: 1545,
      wheelbase: 2533,
      weight: 1300,
    },
    features: [
      "Frenado Autónomo de Emergencia",
      "Mantenimiento de Carril",
      "Climatizador Automático",
      "Tablero Digital 7\"",
      "Cargador Inalámbrico",
    ],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670",
    ],
    description:
      "El primer SUV Coupé de Fiat. Diseño audaz, performance deportiva y el baúl más grande de su categoría.",
    stockStatus: "In Stock",
  },
  {
    id: "3",
    slug: "fiat-toro-volcano",
    make: "Fiat",
    model: "Toro Volcano TD350 4x4",
    year: 2024,
    price: 32990,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "Truck",
    color: "Azul Jazz",
    transmission: "Automatic",
    driveType: "4WD",
    engine: {
      type: "2.0 MultiJet II Turbo Diesel",
      horsepower: 170,
      torque: 350,
      fuelType: "Diesel",
    },
    performance: {
      acceleration: 10.5,
      topSpeed: 190,
    },
    dimensions: {
      length: 4945,
      width: 1844,
      height: 1735,
      wheelbase: 2990,
      weight: 1905,
    },
    features: [
      "Tracción 4x4 Integral",
      "Asientos de Cuero",
      "Llantas de 18\"",
      "Pila de Carga Inteligente",
      "Sensores de Estacionamiento",
    ],
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2671",
    ],
    description:
      "La SUP (Sport Utility Pickup) que combina el confort de un SUV con la robustez de una pickup 4x4.",
    stockStatus: "In Stock",
  },
  {
    id: "4",
    slug: "bmw-m4-competition",
    make: "BMW",
    model: "M4 Competition xDrive",
    year: 2024,
    price: 95000,
    currency: "USD",
    mileage: 1500,
    condition: "Used",
    bodyType: "Coupe",
    color: "Verde Isla de Man",
    transmission: "Automatic",
    driveType: "AWD",
    engine: {
      type: "3.0L 6 Cilindros en Línea Twin Turbo",
      horsepower: 503,
      torque: 650,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 3.4,
      topSpeed: 290,
    },
    dimensions: {
      length: 4794,
      width: 1887,
      height: 1393,
      wheelbase: 2857,
      weight: 1780,
    },
    features: [
      "Asientos Bucket de Carbono",
      "Faros Laserlight",
      "Head-Up Display",
      "Sonido Harmon Kardon",
      "Paquete Exterior M Carbon",
    ],
    images: [
      "/cars/0007df9bea74ccb4f2f9d57d465f4119.webp",
    ],
    description:
      "Dinámica de conducción en su forma más pura. El M4 Competition ofrece un rendimiento lleno de adrenalina con usabilidad diaria.",
    stockStatus: "In Stock",
  },
  {
    id: "5",
    slug: "tesla-model-s-plaid",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 89000,
    currency: "USD",
    mileage: 5000,
    condition: "Used",
    bodyType: "Sedan",
    color: "Gris Metalizado",
    transmission: "Automatic", // Single speed
    driveType: "AWD",
    engine: {
      type: "Tri Motor",
      horsepower: 1020,
      torque: 1420,
      fuelType: "Electric",
    },
    performance: {
      acceleration: 1.99,
      topSpeed: 322,
    },
    dimensions: {
      length: 4970,
      width: 1964,
      height: 1445,
      wheelbase: 2960,
      weight: 2162,
    },
    features: [
      "Piloto Automático",
      "Volante Yoke",
      "Llantas Arachnid de 21 pulgadas",
      "Conectividad Premium",
      "Pantalla Trasera",
    ],
    images: [
      "/cars/Used-2023-Tesla-Model-S-Plaid-1716313171.jpg",
    ],
    description:
      "Más allá de lo absurdo. El coche de producción con la aceleración más rápida en la actualidad.",
    stockStatus: "Sold",
  },
  {
    id: "6",
    slug: "audi-rs-e-tron-gt",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 155000,
    currency: "USD",
    mileage: 200,
    condition: "New",
    bodyType: "Sedan",
    color: "Blanco",
    transmission: "Automatic", // 2-speed
    driveType: "AWD",
    engine: {
      type: "Dual Motor",
      horsepower: 637,
      torque: 830,
      fuelType: "Electric",
    },
    performance: {
      acceleration: 3.1,
      topSpeed: 250,
    },
    dimensions: {
      length: 4989,
      width: 1964,
      height: 1413,
      wheelbase: 2900,
      weight: 2347,
    },
    features: [
      "Techo de Carbono",
      "Sonido 3D Bang & Olufsen",
      "Faros Matrix LED",
      "Paquete Performance",
      "Frenos de Carburo de Tungsteno",
    ],
    images: [
      "/cars/upload-1.webp",
    ],
    description:
      "Arte de rendimiento eléctrico. El RS e-tron GT representa el futuro de Audi Sport.",
    stockStatus: "In Stock",
  },
  {
    id: "7",
    slug: "chevrolet-tracker",
    make: "Chevrolet",
    model: "Tracker",
    year: 2023,
    price: 26990,
    currency: "USD",
    mileage: 15000,
    condition: "Used",
    bodyType: "SUV",
    color: "Blanco",
    transmission: "Manual",
    driveType: "FWD",
    engine: {
      type: "1.2L Turbo",
      horsepower: 130,
      torque: 190,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 10.5,
      topSpeed: 185,
    },
    dimensions: {
      length: 4270,
      width: 1791,
      height: 1626,
      wheelbase: 2570,
      weight: 1250,
    },
    features: [
      "Pantalla Táctil 8 pulgadas",
      "Apple CarPlay y Android Auto",
      "6 Airbags",
      "Cámara de Reversa",
    ],
    images: [
      "/cars/59a24025a23242a8817c7a3d25820751_1721052303579.webp",
    ],
    description: "Versatilidad y eficiencia en un SUV compacto ideal para la ciudad y la ruta.",
    stockStatus: "In Stock",
  },
  {
    id: "8",
    slug: "suzuki-swift-hybrid",
    make: "Suzuki",
    model: "Swift Hybrid",
    year: 2024,
    price: 18990,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "Hatchback",
    color: "Gris Plata",
    transmission: "Manual",
    driveType: "FWD",
    engine: {
      type: "1.2L Mild Hybrid",
      horsepower: 83,
      torque: 107,
      fuelType: "Hybrid",
    },
    performance: {
      acceleration: 13.1,
      topSpeed: 165,
    },
    dimensions: {
      length: 3840,
      width: 1735,
      height: 1495,
      wheelbase: 2450,
      weight: 911,
    },
    features: [
      "Sistema Mild Hybrid",
      "Climatizador Automático",
      "Llantas de Aleación",
      "Faros LED",
    ],
    images: [
      "/cars/atfzj11ho7wsuaba3skvfv31j.jpg",
    ],
    description: "El clásico hatchback de Suzuki, ahora con tecnología híbrida para máximo ahorro.",
    stockStatus: "In Stock",
  },
  {
    id: "9",
    slug: "volkswagen-polo-track",
    make: "Volkswagen",
    model: "Polo Track",
    year: 2024,
    price: 19490,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "Hatchback",
    color: "Gris Plata",
    transmission: "Manual",
    driveType: "FWD",
    engine: {
      type: "1.6L MSI",
      horsepower: 110,
      torque: 155,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 10.8,
      topSpeed: 185,
    },
    dimensions: {
      length: 4074,
      width: 1751,
      height: 1471,
      wheelbase: 2566,
      weight: 1070,
    },
    features: [
      "Control de Estabilidad (ESC)",
      "Radio con Bluetooth",
      "4 Airbags",
      "Asistente de Arranque en Pendiente",
    ],
    images: [
      "/cars/vw-polo-track.webp",
    ],
    description: "La puerta de entrada a la familia Volkswagen. Robusto, seguro y confiable.",
    stockStatus: "In Stock",
  },
  {
    id: "10",
    slug: "hyundai-hb20",
    make: "Hyundai",
    model: "HB20",
    year: 2023,
    price: 17500,
    currency: "USD",
    mileage: 22000,
    condition: "Used",
    bodyType: "Hatchback",
    color: "Gris Oscuro",
    transmission: "Manual",
    driveType: "FWD",
    engine: {
      type: "1.0L",
      horsepower: 80,
      torque: 100,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 14.5,
      topSpeed: 161,
    },
    dimensions: {
      length: 3940,
      width: 1720,
      height: 1470,
      wheelbase: 2530,
      weight: 990,
    },
    features: [
      "Radio con Bluetooth USB",
      "Aire Acondicionado",
      "Dirección Eléctrica",
      "Vidrios Eléctricos",
    ],
    images: [
      "/cars/Lanzamiento_ Hyundai HB20 MY2023 Precios 0km Autoblog Uruguay Precios 20229.jpg",
    ],
    description: "Compacto y económico, líder en ventas por su excelente relación calidad-precio.",
    stockStatus: "In Stock",
  }
];

export async function addCarToDb(carObj: Partial<Car>) {
  const newCar: Car = {
    id: Date.now().toString(),
    slug: carObj.model?.toLowerCase().replace(/\s+/g, '-') || `auto-${Date.now()}`,
    make: carObj.make || "Unknown Make",
    model: carObj.model || "Unknown Model",
    year: carObj.year || new Date().getFullYear(),
    price: carObj.price || 0,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: carObj.bodyType || "Sedan",
    color: carObj.color || "Gris",
    transmission: "Automatic",
    driveType: "AWD",
    engine: {
      type: "Desconocido",
      horsepower: 0,
      torque: 0,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 0,
      topSpeed: 0,
    },
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      wheelbase: 0,
      weight: 0,
    },
    features: [],
    images: ["/cars/Used-2023-Tesla-Model-S-Plaid-1716313171.jpg"], // local high-end placeholder
    description: "Nuevo auto agregado desde el catálogo rápido.",
    stockStatus: "In Stock",
  };
  cars.unshift(newCar);
}

export async function getAllCars(filters?: FilterOptions): Promise<Car[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filteredCars = [...cars];

  if (filters) {
    if (filters.make && filters.make.length > 0) {
      filteredCars = filteredCars.filter((car) =>
        filters.make?.includes(car.make)
      );
    }
    if (filters.bodyType && filters.bodyType.length > 0) {
      filteredCars = filteredCars.filter((car) =>
        filters.bodyType?.includes(car.bodyType)
      );
    }
    if (filters.priceRange) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.price >= filters.priceRange![0] &&
          car.price <= filters.priceRange![1]
      );
    }
    if (filters.yearRange) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.year >= filters.yearRange![0] &&
          car.year <= filters.yearRange![1]
      );
    }
    if (filters.mileageRange) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.mileage >= filters.mileageRange![0] &&
          car.mileage <= filters.mileageRange![1]
      );
    }
    if (filters.fuelType && filters.fuelType.length > 0) {
      filteredCars = filteredCars.filter((car) =>
        filters.fuelType?.includes(car.engine.fuelType)
      );
    }
    if (filters.color && filters.color.length > 0) {
      filteredCars = filteredCars.filter(car =>
        filters.color?.some(c => car.color.toLowerCase().includes(c.toLowerCase()))
      );
    }
  }

  return filteredCars;
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return cars.find((car) => car.slug === slug);
}

export async function getRelatedCars(slug: string): Promise<Car[]> {
  const currentCar = cars.find((c) => c.slug === slug);
  if (!currentCar) return [];

  return cars
    .filter((c) => c.slug !== slug && (c.bodyType === currentCar.bodyType || c.make === currentCar.make))
    .slice(0, 3);
}

export async function getUniqueFilters() {
  const makes = Array.from(new Set(cars.map((c) => c.make)));
  const bodyTypes = Array.from(new Set(cars.map((c) => c.bodyType)));
  const colors = Array.from(new Set(cars.map((c) => c.color)));
  const fuelTypes = Array.from(new Set(cars.map((c) => c.engine.fuelType)));

  return { makes, bodyTypes, colors, fuelTypes };
}
