export interface Vehicle {
  id: string;
  tenant_id: string;
  brand: string;
  model: string;
  type: string;
  operation: string;
  version: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  price: number;
  currency: string;
  color: string;
  image_url: string | null;
  available: boolean;
  extra_data: any;
  created_at: string;
}
