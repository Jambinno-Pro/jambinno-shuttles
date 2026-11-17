"use client";

import { useEffect, useState } from "react";
import "./Hero.css";

const TOTAL_SLIDES = 5;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % TOTAL_SLIDES);
    }, 6000);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background image slideshow */}
      <div className="hero-slider" aria-hidden="true">
        <div className="hero-slide hero-slide-one" />
        <div className="hero-slide hero-slide-two" />
        <div className="hero-slide hero-slide-three" />
        <div className="hero-slide hero-slide-four" />
        <div className="hero-slide hero-slide-five" />
      </div>

      {/* Full image gradient overlay */}
      <div className="hero-text-overlay" />

      {/* Full hero diamond shower */}
      <div className="hero-diamonds" aria-hidden="true">
        {Array.from({ length: 100 }).map((_, index) => (
          <span
            key={index}
            className="hero-diamond"
            style={{
              left: `${(index * 37) % 100}%`,
              animationDelay: `${(index * 0.37) % 12}s`,
              animationDuration: `${8 + ((index * 13) % 10)}s`,
              width: `${3 + ((index * 7) % 5)}px`,
              height: `${3 + ((index * 7) % 5)}px`,
              opacity: 0.3 + ((index * 11) % 6) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Animated vertical light lines */}
      <div className="hero-light-lines" aria-hidden="true">
        <span className="light-line light-line-one">
          <span className="light-beam" />
        </span>

        <span className="light-line light-line-two">
          <span className="light-beam" />
        </span>

        <span className="light-line light-line-three">
          <span className="light-beam" />
        </span>

        <span className="light-line light-line-four">
          <span className="light-beam" />
        </span>
      </div>

      {/* Hero content */}
      <div className="hero-content container">
        <p className="hero-eyebrow">
          <span className="hero-accent-line" />
          CAPE TOWN AFRICAN HOSPITALITY. EXCEPTIONAL JOURNEYS.
        </p>

        <h1>
          Let's Take You Around Cape,
          <br />
          <span>Beautifully Connected.</span>
        </h1>

        <p className="hero-description">
          From airport transfers, hotel and private transfers, wine tours, city
          sightseeing, Garden Route adventures, safari and game drive
          experiences, to chauffeur services, event transportation and private
          tours, Jambinno Shuttles connects you to every destination with
          comfort, reliability and the warmth of African hospitality.
        </p>

        <div className="hero-actions">
          <a href="/booking" className="button button-gold">
            Book Your Journey <span>↗</span>
          </a>

          <a href="/services" className="hero-secondary-link">
            Discover Our Services <span>↓</span>
          </a>
        </div>
      </div>

      {/* Dynamic slide counter */}
      <div className="hero-number" aria-live="off">
        <span>{String(activeSlide + 1).padStart(2, "0")}</span>
        <span className="hero-number-divider">/</span>
        <span>05</span>
        <span className="hero-number-label">JOURNEY</span>
      </div>
    </section>
  );
}
