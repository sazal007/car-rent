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

export interface TourData {
  name: string;
  slug: string;
  image: string;
  price: string; // stored as string in your response
  content: string; // HTML string
  duration: string;
  includes: string; // JSON string: e.g. "[\"EV Scooter/Taxi\",\"Entry Fees\"]"
}
