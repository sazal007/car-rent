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
}

export interface BookingEntry {
  id: number;
  collection: number;
  data: BookingData;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
