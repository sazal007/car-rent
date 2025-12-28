export interface BookingData {
  name: string;
  "ride type": string;
  "ride date": string; // ISO date string (YYYY-MM-DD)
  "phone number": number;
  email: string;
  "license image"?: string;
  price: number;
  "payment method"?: string;
  "payment status"?: string;
  "return date": string; // ISO date string (YYYY-MM-DD)
  "vehicle name": string;
  "number of persons"?: number; // For taxi bookings
}

export interface TourBookingData {
  name: string;
  "tour date": string; // ISO date string (YYYY-MM-DD)
  "phone number": number;
  Email: string;
  "payment method"?: string;
  status?: string;
  "package name": string;
  price: number;
  "group size": string;
}

export interface BookingEntry {
  id: number;
  collection: number;
  data: BookingData;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
