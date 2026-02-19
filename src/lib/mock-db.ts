// src/lib/mock-db.ts
import { Car, FilterOptions } from "@/types/automotive";

const cars: Car[] = [
  {
    id: "1",
    slug: "range-rover-sport-autobiography",
    make: "Land Rover",
    model: "Range Rover Sport Autobiography",
    year: 2025,
    price: 145000,
    currency: "USD",
    mileage: 0,
    condition: "New",
    bodyType: "SUV",
    color: "Dark Green",
    transmission: "Automatic",
    driveType: "AWD",
    engine: {
      type: "4.4L V8 Twin Turbo",
      horsepower: 523,
      torque: 750,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 4.3,
      topSpeed: 250,
    },
    dimensions: {
      length: 4946,
      width: 2047,
      height: 1820,
      wheelbase: 2997,
      weight: 2430,
    },
    features: [
      "Meridian Signature Sound System",
      "Panoramic Sunroof",
      "Heated & Ventilated Seats",
      "Adaptive Cruise Control",
      "360 Camera",
    ],
    images: [
      "https://images.unsplash.com/photo-1754254013090-21573dc4e7d5?fm=jpg&q=60&w=3000&auto=format&fit=crop", // Main Green Range Rover
      "https://images.unsplash.com/photo-1675257020144-8d96d246294d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Interior detail (generic luxury)
      "https://images.unsplash.com/photo-1627454820574-fb6aae3a505b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Wheel detail (generic)
    ],
    description:
      "The epitome of sporting luxury. The new Range Rover Sport combines dramatic modernity with distinctive character and electrified performance.",
    stockStatus: "In Stock",
  },
  {
    id: "2",
    slug: "porsche-911-gt3-rs",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 285000,
    currency: "USD",
    mileage: 120,
    condition: "New",
    bodyType: "Coupe",
    color: "Arctic Grey",
    transmission: "Automatic", // PDK
    driveType: "RWD",
    engine: {
      type: "4.0L Flat-6 Naturally Aspirated",
      horsepower: 518,
      torque: 465,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 3.0,
      topSpeed: 296,
    },
    dimensions: {
      length: 4572,
      width: 1900,
      height: 1322,
      wheelbase: 2457,
      weight: 1450,
    },
    features: [
      "Weissach Package",
      "Carbon Ceramic Brakes",
      "Front Axle Lift System",
      "Bucket Seats",
      "Roll Cage",
    ],
    images: [
      "https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Generic Porsche
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Interior
    ],
    description:
      "Born on the racetrack. The 911 GT3 RS is designed for maximum performance with race-bred technology for the road.",
    stockStatus: "In Stock",
  },
  {
    id: "3",
    slug: "mercedes-amg-g63",
    make: "Mercedes-Benz",
    model: "AMG G 63",
    year: 2024,
    price: 198000,
    currency: "USD",
    mileage: 50,
    condition: "New",
    bodyType: "SUV",
    color: "Obsidian Black",
    transmission: "Automatic",
    driveType: "AWD",
    engine: {
      type: "4.0L V8 Biturbo",
      horsepower: 577,
      torque: 850,
      fuelType: "Gasoline",
    },
    performance: {
      acceleration: 4.5,
      topSpeed: 220,
    },
    dimensions: {
      length: 4873,
      width: 1984,
      height: 1969,
      wheelbase: 2890,
      weight: 2560,
    },
    features: [
      "Burmester Surround Sound",
      "Massage Seats",
      "Night Package",
      "22-inch Forged Wheels",
      "Rear Entertainment System",
    ],
    images: [
      "https://images.unsplash.com/photo-1520031441872-265149a9e690?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // G Wagon
    ],
    description:
      "An icon of performance and luxury. The G 63 combines off-road capability with AMG performance and exclusive appointments.",
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
    color: "Isle of Man Green",
    transmission: "Automatic",
    driveType: "AWD",
    engine: {
      type: "3.0L Inline-6 Twin Turbo",
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
      "Carbon Bucket Seats",
      "Laserlight Headlights",
      "Head-Up Display",
      "Harmon Kardon Sound",
      "M Carbon Exterior Package",
    ],
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // M4
    ],
    description:
      "Driving dynamics in their purest form. The M4 Competition delivers adrenaline-pumping performance with everyday usability.",
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
    color: "Deep Blue Metallic",
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
      "Autopilot",
      "Yoke Steering",
      "21-inch Arachnid Wheels",
      "Premium Connectivity",
      "Rear Screen",
    ],
    images: [
      "https://images.unsplash.com/photo-1617704548623-29a198be5c87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Model S
    ],
    description:
      "Beyond Ludicrous. The quickest accelerating car in production today.",
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
    color: "Kemora Gray",
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
      "Carbon Roof",
      "Bang & Olufsen 3D Sound",
      "Matrix LED Headlights",
      "Performance Package",
      "Tungsten Carbide Brakes",
    ],
    images: [
      "https://images.unsplash.com/photo-1614026480418-bd11fdb9fa06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // e-tron
    ],
    description:
      "Electric performance art. The RS e-tron GT represents the future of Audi Sport.",
    stockStatus: "In Stock",
  },
];

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

  return { makes, bodyTypes, colors };
}
