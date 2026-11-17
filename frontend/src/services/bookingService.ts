
import API_URL from "@/config/api";

export interface Booking {
  id: number;
  bookingReference: string;
  fullName: string;
  email: string;
  phone: string;
  pickup: string;
  destination: string;
  travelDate: string;
  passengers: string;
  service: string;
  specialRequests?: string | null;
  status: string;
  createdAt: string;
}

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Authentication required. Please log in again.");
    }

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error("You are not authorized to view bookings.");
    }

    if (!response.ok) {
      throw new Error("Failed to retrieve bookings.");
    }

    return response.json();
  },
};
