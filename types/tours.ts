export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TourEntry {
  id: number;
  collection: number;
  data: TourData;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PriceTier {
  min_group_size: number;
  max_group_size: number;
  price_per_person: number;
}

export interface TourData {
  name: string;
  slug: string;
  image: string;
  price: string; // JSON string array of PriceTier objects
  content: string; // HTML string
  duration: string;
  includes: string; // JSON string: e.g. "[\"EV Scooter/Taxi\",\"Entry Fees\"]"
  excludes?: string; // Optional string field
}
