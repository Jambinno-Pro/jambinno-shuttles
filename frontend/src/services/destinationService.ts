
import API_URL from "@/config/api";

export interface Destination {
  id: number;
  pricingCategoryId: number;
  categoryName: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface DestinationCategory {
  id: number;
  name: string;
  isActive: boolean;
}

export interface DestinationRequest {
  pricingCategoryId: number;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await fetch(`${API_URL}/api/destinations/${endpoint}`, {
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
      typeof result === "string"
        ? result
        : result?.message || "Unable to complete the destination request.",
    );
  }

  return result as T;
}

export const destinationService = {
  getDestinations(): Promise<Destination[]> {
    return request<Destination[]>(""); 
  },

  getCategories(): Promise<DestinationCategory[]> {
    return request<DestinationCategory[]>("categories");
  },

  createDestination(data: DestinationRequest) {
    return request<{ message: string; id: number }>("", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateDestination(id: number, data: DestinationRequest) {
    return request<{ message: string }>(`${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  updateDestinationStatus(id: number, isActive: boolean) {
    return request<{ message: string; isActive: boolean }>(`${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });
  },
};
