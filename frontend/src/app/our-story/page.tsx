import "./OurStory.css";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Heart,
  Gem,
  Compass,
  MapPin,
  Users,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Safety & Trust",
    description:
      "We believe every journey should begin with confidence. Passenger wellbeing and responsible service guide our approach.",
  },
  {
    icon: Clock3,
    number: "02",
    title: "Reliability",
    description:
      "We understand that time matters. Our goal is to make every travel experience organised, dependable and stress-free.",
  },
  {
    icon: Gem,
    number: "03",
    title: "Quality & Comfort",
    description:
      "From the first enquiry to the final destination, we believe the little details make a meaningful difference.",
  },
  {
    icon: Heart,
    number: "04",
    title: "African Hospitality",
    description:
      "Warmth, respect and genuine care are at the heart of how we want every passenger to feel.",
  },
];

export default function OurStoryPage() {
  return (
    <main className="story-page">
      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-overlay" />

        <div className="story-container story-hero-content">
          <div className="story-hero-text">
            <span className="story-eyebrow">THE JOURNEY BEHIND THE BRAND</span>

            <h1>
              Every Journey
              <span> Has a Story.</span>
            </h1>

            <p>
              Discover the vision, values and African spirit behind Jambinno
              Shuttle Services.
            </p>

            <div className="story-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Our Story</span>
            </div>
          </div>

          <div className="story-hero-number">
            <span>J</span>
            <small>JAMBINNO</small>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="story-intro">
        <div className="story-container story-intro-grid">
          <div className="story-intro-image">
            <div className="story-intro-photo" />

            <div className="story-image-caption">
              <span className="story-caption-line" />
              <span>Inspired by the spirit of Africa</span>
            </div>
          </div>

          <div className="story-intro-content">
            <span className="story-section-label">WHO WE ARE</span>

            <h2>
              Not Just About
              <span> Getting There.</span>
              <br />
              It's About the Journey.
            </h2>

            <p>
              At Jambinno Shuttle Services, we believe transportation should be
              more than simply moving from one place to another. It should be an
              experience defined by comfort, confidence and exceptional
              hospitality.
            </p>

            <p>
              Inspired by the warmth and welcoming spirit of Africa, our vision
              is to create meaningful travel experiences for people exploring
              Cape Town and destinations beyond.
            </p>

            <p>
              Whether it's an airport transfer, a scenic getaway, a business
              trip or a special occasion, we want every journey to feel
              considered, comfortable and memorable.
            </p>

            <Link href="/services" className="story-link">
              Discover Our Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="story-philosophy">
        <div className="story-container story-philosophy-content">
          <span className="story-section-label">OUR PHILOSOPHY</span>

          <h2>
            African Roots.
            <span> A World of Possibilities.</span>
          </h2>

          <p>
            We draw inspiration from the African tradition of welcoming people
            with warmth, generosity and respect. This spirit shapes the
            experience we aspire to create for every passenger.
          </p>

          <div className="story-philosophy-divider">
            <span />
            <Gem size={20} />
            <span />
          </div>

          <strong>Travel with purpose. Arrive with a story.</strong>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="story-purpose">
        <div className="story-container">
          <div className="story-heading">
            <span className="story-section-label">OUR DIRECTION</span>
            <h2>What Drives Us Forward</h2>
            <p>A clear purpose and a vision for better travel experiences.</p>
          </div>

          <div className="story-purpose-grid">
            <article className="story-purpose-card story-mission">
              <div className="story-purpose-icon">
                <Compass size={28} />
              </div>

              <span>OUR MISSION</span>

              <h3>Making Every Journey Matter.</h3>

              <p>
                To provide thoughtful, comfortable and reliable passenger
                transport experiences built around the needs of our customers.
              </p>
            </article>

            <article className="story-purpose-card story-vision">
              <div className="story-purpose-icon">
                <MapPin size={28} />
              </div>

              <span>OUR VISION</span>

              <h3>Connecting People to Possibilities.</h3>

              <p>
                To grow into a trusted travel and shuttle brand, recognised for
                quality, African hospitality and memorable journeys across South
                Africa.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="story-values">
        <div className="story-container">
          <div className="story-heading">
            <span className="story-section-label">WHAT WE STAND FOR</span>

            <h2>Our Values Define Us.</h2>

            <p>
              The principles behind every decision, interaction and journey.
            </p>
          </div>

          <div className="story-values-grid">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article className="story-value-card" key={value.number}>
                  <div className="story-value-top">
                    <div className="story-value-icon">
                      <Icon size={25} />
                    </div>

                    <span>{value.number}</span>
                  </div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="story-cta">
        <div className="story-container story-cta-content">
          <div>
            <span className="story-cta-eyebrow">
              THE JOURNEY STARTS WITH YOU
            </span>

            <h2>
              Wherever Life Takes You,
              <span> Let's Get You There.</span>
            </h2>

            <p>Let Jambinno be part of your next journey.</p>
          </div>

          <Link href="/booking" className="story-cta-button">
            Plan Your Journey
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
}
