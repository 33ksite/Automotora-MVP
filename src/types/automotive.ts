// src/types/automotive.ts

export type BodyType = 'SUV' | 'Sedan' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Truck';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid';
export type Transmission = 'Automatic' | 'Manual' | 'CVT';
export type DriveType = 'RWD' | 'FWD' | 'AWD' | '4WD';

export interface Engine {
  type: string; // e.g., "V8 Biturbo"
  horsepower: number;
  torque: number; // Nm
  displacement?: number; // Liters
  fuelType: FuelType;
}

export interface Performance {
  acceleration: number; // 0-100 km/h in seconds
  topSpeed: number; // km/h
}

export interface Dimensions {
  length: number; // mm
  width: number; // mm
  height: number; // mm
  wheelbase: number; // mm
  weight: number; // kg
}

export interface Car {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
  bodyType: BodyType;
  color: string;
  transmission: Transmission;
  driveType: DriveType;
  engine: Engine;
  performance: Performance;
  dimensions: Dimensions;
  features: string[];
  images: string[];
  description: string;
  stockStatus: 'In Stock' | 'Reserved' | 'Sold';
}

export interface FilterOptions {
  make?: string[];
  bodyType?: BodyType[];
  priceRange?: [number, number];
  yearRange?: [number, number];
  color?: string[];
  fuelType?: FuelType[];
}
