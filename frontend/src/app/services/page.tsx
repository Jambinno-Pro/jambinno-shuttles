import Link from "next/link";
import {
  Plane,
  Wine,
  Route,
  Car,
  Clock3,
  Users,
  MapPin,
  Utensils,
  Compass,
  CalendarDays,
  Hotel,
  PawPrint,
  CalendarCheck,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import "./ServicesPage.css";

const services = [
  {
    title: "Airport Transfers",
    image: "/images/services/airport-transfers.png",
    description:
      "Seamless door-to-door airport transfers from Cape Town International. We monitor your flight in real time so your driver is always ready and waiting.",
    features: [
      { label: "Meet & Greet service", icon: Users },
      { label: "Flight monitoring", icon: Plane },
      { label: "Luxury vehicles", icon: Car },
      { label: "24 / 7 availability", icon: Clock3 },
    ],
  },
  {
    title: "Wine Tours",
    image: "/images/services/wine-tour.png",
    description:
      "Discover the legendary Cape Winelands — Stellenbosch, Franschhoek and Paarl. Enjoy world-class estates, private tastings and gourmet pairings.",
    features: [
      { label: "Stellenbosch & Franschhoek", icon: MapPin },
      { label: "Private cellar tours", icon: Wine },
      { label: "Gourmet lunch options", icon: Utensils },
      { label: "Customisable itineraries", icon: Compass },
    ],
  },
  {
    title: "Garden Route",
    image: "/images/services/garden-route.png",
    description:
      "Journey along South Africa's most spectacular coastal highway. Explore ancient forests, pristine lagoons and charming coastal villages.",
    features: [
      { label: "Knysna & Tsitsikamma", icon: MapPin },
      { label: "Scenic coastal routes", icon: Route },
      { label: "Multi-day packages", icon: CalendarDays },
      { label: "Hotel coordination", icon: Hotel },
    ],
  },
  {
    title: "Game Drives",
    image: "/images/services/game-drive.png",
    description:
      "Encounter Africa's magnificent wildlife up close with curated game drive experiences at premier reserves near Cape Town.",
    features: [
      { label: "Big Five experiences", icon: PawPrint },
      { label: "Expert ranger guides", icon: Users },
      { label: "Sunrise & sunset drives", icon: Clock3 },
      { label: "Full-day packages", icon: CalendarCheck },
    ],
  },
  {
    title: "Chauffeur Services",
    image: "/images/services/chauffeur.png",
    description:
      "Travel in comfort and style with a professional private chauffeur. Ideal for business travel, special occasions and personalised journeys.",
    features: [
      { label: "Professional chauffeurs", icon: BriefcaseBusiness },
      { label: "Luxury vehicles", icon: Car },
      { label: "Private door-to-door service", icon: MapPin },
      { label: "Flexible itineraries", icon: CalendarDays },
    ],
  },
  {
    title: "Events Transfer",
    image: "/images/services/events-transfer.png",
    description:
      "Reliable and comfortable transportation for weddings, conferences, celebrations and special events across Cape Town and beyond.",
    features: [
      { label: "Wedding transfers", icon: Sparkles },
      { label: "Corporate events", icon: BriefcaseBusiness },
      { label: "Group transportation", icon: Users },
      { label: "Event coordination", icon: CalendarCheck },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-page-hero">
        <Link href="/" className="services-page-back-home">
          <ChevronLeft size={17} />
          Back to Home
        </Link>

        <div className="services-page-hero-overlay" />

        <div className="services-page-container services-page-hero-content">
          <span className="services-page-eyebrow">DISCOVER THE JOURNEY</span>

          <h1>
            Journeys designed
            <br />
            around <span>you.</span>
          </h1>

          <p>
            From airport arrivals to unforgettable escapes, experience
            comfortable, dependable transport with a personal touch.
          </p>
        </div>
      </section>

      <section className="services-page-listing">
        <div className="services-page-container">
          <div className="services-page-section-heading">
            <div>
              <span className="services-page-eyebrow">TRAVEL YOUR WAY</span>
              <h2>Explore our services</h2>
            </div>

            <p>Choose your journey. We'll help you plan the ride.</p>
          </div>

          <div className="services-page-grid">
            {services.map((service, index) => {
              return (
                <article className="services-page-card" key={service.title}>
                  <div className="services-page-card-image">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />

                    <span className="services-page-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="services-page-card-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <ul>
                      {service.features.map((feature) => {
                        const FeatureIcon = feature.icon;

                        return (
                          <li key={feature.label}>
                            <FeatureIcon size={17} strokeWidth={1.8} />
                            <span>{feature.label}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <Link
                      href={`/booking?service=${encodeURIComponent(service.title)}`}
                      className="services-page-card-link"
                    >
                      Book this service <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-page-cta">
        <div className="services-page-container services-page-cta-inner">
          <div>
            <span className="services-page-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              Have a destination
              <br />
              in mind?
            </h2>

            <p>
              Tell us where you want to go. Let's make your next journey a
              comfortable one.
            </p>
          </div>

          <Link href="/booking" className="services-page-primary-btn">
            Request a Booking <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
