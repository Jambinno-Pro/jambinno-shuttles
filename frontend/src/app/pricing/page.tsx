"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pricingService } from "@/services/pricingService";
import type {
  PricingCategory,
  DestinationPriceBand,
} from "@/services/pricingService";
import { ArrowRight, MapPin, Loader2, Compass } from "lucide-react";
import "./Pricing.css";

const passengerBands = [
  { min: 1, max: 3, label: "1–3" },
  { min: 4, max: 7, label: "4–7" },
  { min: 8, max: 14, label: "8–14" },
  { min: 15, max: 22, label: "15–22" },
];

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function getPrice(
  priceBands: DestinationPriceBand[],
  min: number,
  max: number,
) {
  return priceBands.find(
    (band) => band.minimumPassengers === min && band.maximumPassengers === max,
  );
}

export default function PricingPage() {
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPricing() {
      try {
        const data = await pricingService.getCategories();
        setCategories(data);
      } catch {
        setError(
          "We could not load our pricing information. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadPricing();
  }, []);

  if (loading) {
    return (
      <main className="pricing-page">
        <div className="pricing-loading">
          <Loader2 className="pricing-spinner" size={36} />
          <p>Loading our destination prices...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pricing-page">
      {/* HERO */}
      <section className="pricing-hero">
        <div className="pricing-hero-overlay" />

        <div className="pricing-hero-content">
          <span className="pricing-eyebrow">
            TWENDE JAMBI NNO · LET&apos;S GO
          </span>

          <h1>
            Your journey.
            <br />
            <span>Your destination.</span>
          </h1>

          <p>
            Discover the Cape and beyond with private shuttle experiences
            crafted around your journey.
          </p>

          <div className="pricing-hero-badge">
            <Compass size={18} />
            <span>Explore South Africa with us</span>
          </div>
        </div>
      </section>

      {/* PRICING INTRODUCTION */}
      <section className="pricing-intro">
        <div className="pricing-section-heading">
          <span className="pricing-eyebrow">TRANSPARENT JOURNEY PRICING</span>

          <h2>Explore Our Transport Rates</h2>

          <p>
            Choose your destination and passenger group to view our one-way
            private vehicle transfer prices.
          </p>
        </div>

        <div className="pricing-information">
          <div>
            <MapPin size={19} />
            <span>Departures from Cape Town</span>
          </div>

          <div>
            <Compass size={19} />
            <span>One-way transfers</span>
          </div>

          <div>
            <span className="pricing-vehicle-icon">22</span>
            <span>Up to 22 passengers</span>
          </div>
        </div>

        <p className="pricing-disclaimer">
          All prices are in South African Rand (ZAR), per private vehicle, for
          one-way journeys. Prices are determined by passenger group size.
        </p>
      </section>

      {/* PRICING TABLES */}
      <section className="pricing-tables-section">
        {error && <div className="pricing-error">{error}</div>}

        {!error &&
          categories.map((category) => (
            <section key={category.id} className="pricing-category-section">
              <div className="pricing-category-heading">
                <span className="pricing-category-eyebrow">
                  {category.eyebrow}
                </span>

                <h2>{category.name}</h2>

                {category.description && <p>{category.description}</p>}
              </div>

              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Destination</th>

                      {passengerBands.map((band) => (
                        <th key={band.label}>
                          <span>{band.label}</span>
                          <small>Passengers</small>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {category.destinations.map((destination) => (
                      <tr key={destination.id}>
                        <td className="pricing-destination-name">
                          <MapPin size={16} />
                          <span>{destination.name}</span>
                        </td>

                        {passengerBands.map((band) => {
                          const price = getPrice(
                            destination.priceBands ?? [],
                            band.min,
                            band.max,
                          );

                          return (
                            <td key={band.label}>
                              {price ? (
                                <span className="pricing-table-price">
                                  {formatPrice(price.price, price.currency)}
                                </span>
                              ) : (
                                <Link
                                  className="pricing-table-quote"
                                  href={`/contact?destination=${encodeURIComponent(
                                    destination.name,
                                  )}&passengers=${band.min}-${band.max}`}
                                >
                                  Request a Quote
                                </Link>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
      </section>

      {/* BOTTOM CTA */}
      <section className="pricing-bottom-cta">
        <span className="pricing-eyebrow">YOUR JOURNEY STARTS HERE</span>

        <h2>
          Let&apos;s make your
          <br />
          next journey unforgettable.
        </h2>

        <p>
          Need a custom route, private tour or group transfer? Our team is ready
          to help.
        </p>

        <Link href="/contact" className="pricing-contact-button">
          Contact Our Team
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
