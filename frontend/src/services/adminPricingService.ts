
import API_URL from "@/config/api";

export interface AdminDestination {
  id: number;
  name: string;
  isActive: boolean;
  categoryName: string;
}

export interface PriceRange {
  id: number;
  destinationId: number;
  minimumPassengers: number;
  maximumPassengers: number;
  price: number;
  currency: string;
  isActive: boolean;
}

export interface DestinationPriceRanges {
  destination: {
    id: number;
    name: string;
    isActive: boolean;
  };
  priceRanges: PriceRange[];
}

export interface PriceRangeRequest {
  destinationId: number;
  minimumPassengers: number;
  maximumPassengers: number;
  price: number;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await fetch(`${API_URL}/api/adminpricing/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Unable to complete the pricing request.",
    );
  }

  return result as T;
}

export const adminPricingService = {
  getDestinations(): Promise<AdminDestination[]> {
    return request<AdminDestination[]>("destinations");
  },

  getPriceRanges(destinationId: number): Promise<DestinationPriceRanges> {
    return request<DestinationPriceRanges>(
      `destinations/${destinationId}/price-ranges`,
    );
  },

  createPriceRange(data: PriceRangeRequest) {
    return request<{ message: string; id: number }>("price-ranges", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updatePriceRange(id: number, data: PriceRangeRequest) {
    return request<{ message: string }>(`price-ranges/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  updatePriceRangeStatus(id: number, isActive: boolean) {
    return request<{ message: string; isActive: boolean }>(
      `price-ranges/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      },
    );
  },
};
