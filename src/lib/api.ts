// api.ts
// src/lib/api.ts
import { LookupStage } from "@/types/types";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

// Re-defining (or ensuring consistency with) types from page.tsx for clarity in api.ts

interface FetchParams {
  dbName: string;
  collectionName: string;
  query?: Record<string, unknown>;
  projection?: Record<string, number>;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  lookups?: LookupStage[];
}

export async function fetchFromAPI<T>({
  dbName,
  collectionName,
  query = {},
  projection = {},
  limit = 0,
  skip = 0,
  sortBy,
  lookups = [],
  order = "asc",
}: FetchParams): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/general/mfind`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        dbName,
        collectionName,
        query,
        projection,
        limit,
        skip,
        sortBy,
        order,
        lookups,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result?.data || [];
  } catch (err) {
    console.error("API Fetch Error:", err instanceof Error ? err.message : err);
    throw err;
  }
}
