// Generic paginated response
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// The inner "data" object
export interface CollectionItemData {
  name: string;
  slug: string;
  content: string;
}

// A single result item
export interface CollectionItem {
  id: number;
  collection: number;
  data: CollectionItemData;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// Final concrete response type
export type CollectionItemsResponse = PaginatedResponse<CollectionItem>;
