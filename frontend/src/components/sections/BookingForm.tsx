
"use client";

import { useEffect, useState } from "react";
import "./BookingForm.css";

const services = [
  "Airport Transfer",
  "Wine Tour",
  "Garden Route",
  "Game Drive",
  "Chauffeur Services",
  "Events Transfer",
  "Private Tour",
  "Other",
];

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5234";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [minTravelDate, setMinTravelDate] = useState("");

  useEffect(() => {
    setMinTravelDate(new Date().toISOString().split("T")[0]);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setBookingReference("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      pickup: formData.get("pickup"),
      destination: formData.get("destination"),
      travelDate: formData.get("travelDate"),
      passengers: formData.get("passengers"),
      service: formData.get("service"),
      specialRequests: formData.get("specialRequests"),
    };

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit booking.");
      }

      setMessage(result.message);
      setBookingReference(result.bookingReference);
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="booking-section" id="booking">
      <div className="booking-card">
        <div className="booking-heading">
          <span className="booking-eyebrow">
            <span className="booking-accent" />
            PLAN YOUR JOURNEY
          </span>

          <h2>
            Where would you <span>like to go?</span>
          </h2>

          <p>
            Share your travel details and let us arrange a comfortable,
            convenient journey for you.
          </p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-fields">
            <div className="booking-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="pickup">Pickup Location</label>
              <input
                type="text"
                id="pickup"
                name="pickup"
                placeholder="Departure location"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="Destination"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="travelDate">Travel Date</label>
              <input
  type="date"
  id="travelDate"
  name="travelDate"
  min={minTravelDate || undefined}
  required
/>
            </div>

            <div className="booking-field">
              <label htmlFor="passengers">Passengers</label>
              <select
                id="passengers"
                name="passengers"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select passengers
                </option>

                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Passenger" : "Passengers"}
                  </option>
                ))}

                <option value="21+">More than 20</option>
              </select>
            </div>

            <div className="booking-field">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select service
                </option>

                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-field booking-special-field">
              <label htmlFor="specialRequests">
                Special Requests (Optional)
              </label>

              <textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Any additional information?"
                rows={1}
              />
            </div>

            <button
              type="submit"
              className="booking-submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Request a Booking"}
              <span>↗</span>
            </button>
          </div>

          {message && (
            <div
              className={`booking-feedback ${
                bookingReference ? "booking-success" : "booking-error"
              }`}
              role="status"
            >
              <p>{message}</p>

              {bookingReference && (
                <strong>
                  Booking Reference: {bookingReference}
                </strong>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
