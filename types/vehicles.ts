// API Response Types
export interface GuidedUnguidedOption {
  price: string;
  includes: string;
}

export interface VehicleData {
  fuel: string;
  name: string;
  slug: string;
  type: string;
  year: string;
  brand: string;
  image: string;
  price: number;
  seats: number;
  content: string;
  gallery: string | string[]; // Can be JSON string or array
  luggage: string;
  category: string;
  features: string; // JSON string
  description: string;
  transmission: string;
  "guided(price, includes)"?: string; // JSON string array
  "unguided(price, includes)"?: string; // JSON string array
}

export interface VehicleApiResponse {
  id: number;
  collection: number;
  data: VehicleData;
  created_at: string;
  updated_at: string;
}

export interface VehiclesApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: VehicleApiResponse[];
}

// Transformed Vehicle Type (matches Car interface from types.ts)
export interface Vehicle {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  luggage: number;
  slug: string;
  brand?: string;
  year?: string;
  fuel?: string;
  description?: string;
  features?: string[];
  gallery?: string[];
  category?: string;
  guidedOptions?: GuidedUnguidedOption[];
  unguidedOptions?: GuidedUnguidedOption[];
}
