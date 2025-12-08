export interface Car {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  seats: number;
  transmission: "Manual" | "Automatic";
  luggage: number;
  // New fields for detail page
  brand?: string;
  year?: number;
  fuel?: string;
  description?: string;
  features?: string[];
  gallery?: string[];
  category?: "Self-ride Scooter" | "Guide with Scooter" | "Ev Taxi" | "Tours";
}

export interface Review {
  id: string;
  text: string;
  author: string;
  avatar: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subLinks?: { label: string; href: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PolicySection {
  title: string;
  content: string[];
  list?: string[];
}

export type BlogSectionType = "paragraph" | "heading" | "list" | "quote";

export interface BlogContentSection {
  type: BlogSectionType;
  content: string | string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  intro: string;
  content: BlogContentSection[];
}

export interface Tour {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  includes: string[];
}
