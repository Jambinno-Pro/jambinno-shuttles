
import API_URL from "@/config/api";

export interface DashboardOverview {
  categories: {
    total: number;
    active: number;
  };
  destinations: {
    total: number;
    active: number;
    inactive: number;
  };
  passengerPricing: {
    total: number;
    active: number;
    inactive: number;
  };
  administrators: {
    total: number;
  };
}

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Your session has expired. Please log in again.");
    }

    const response = await fetch(`${API_URL}/api/dashboard/overview`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        result?.message || "Unable to load dashboard information."
      );
    }

    return result as DashboardOverview;
  },
};
