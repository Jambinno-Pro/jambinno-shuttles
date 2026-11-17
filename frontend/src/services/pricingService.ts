import API_URL from "@/config/api";

export interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  priceBands: DestinationPriceBand[];
}

export interface PricingCategory {
  id: number;
  name: string;
  slug: string;
  eyebrow: string;
  description: string | null;
  destinations: Destination[];
}

export interface DestinationPriceBand {
  minimumPassengers: number;
  maximumPassengers: number;
  price: number;
  currency: string;
}

export interface DestinationDetails extends Destination {
  category: string;
}

export interface PricingEstimate {
  destinationId: number;
  destination: string;
  passengers: number;
  hasEstimate: boolean;
  message?: string;
  minimumPassengers?: number;
  maximumPassengers?: number;
  price?: number;
  currency?: string;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}/api/pricing/${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const pricingService = {
  getCategories: () => fetchApi<PricingCategory[]>("categories"),

  getDestinations: () => fetchApi<Destination[]>("destinations"),

  getDestination: (id: number) =>
    fetchApi<DestinationDetails>(`destinations/${id}`),

  getEstimate: (destinationId: number, passengers: number) =>
    fetchApi<PricingEstimate>(
      `estimate?destinationId=${destinationId}&passengers=${passengers}`,
    ),
};
