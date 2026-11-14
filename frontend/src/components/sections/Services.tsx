import Image from "next/image";
import "./Services.css";
import {
  CalendarDays,
  BriefcaseBusiness,
  Users,
  CalendarCheck,
  Plane,
  Wine,
  Route,
  PawPrint,
  Car,
  MapPin,
  Clock3,
  Hotel,
  Utensils,
  Compass,
  TreePine,
  Sparkles,
  Check,
} from "lucide-react";

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

export default function Services() {
  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        <div className="section-heading services-heading">
          <div>
            <p className="eyebrow">HOW WE MOVE YOU</p>
            <h2 className="section-title">
              Journeys designed
              <br />
              <span className="gold-text">around you.</span>
            </h2>
          </div>

          <p className="section-intro">
            From seamless airport arrivals to unforgettable African experiences,
            discover transport services designed around your comfort,
            convenience and journey.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-image">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 50vw"
                />

                <span className="service-image-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="service-card-content">
                <p className="service-label">SERVICE</p>

                <h3>{service.title}</h3>

                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature) => {
                    const FeatureIcon = feature.icon;

                    return (
                      <li key={feature.label}>
                        <span className="feature-icon">
                          <FeatureIcon size={16} strokeWidth={1.8} />
                        </span>

                        <span className="feature-text">{feature.label}</span>
                      </li>
                    );
                  })}
                </ul>

                <a href="#booking" className="service-link">
                  Book This Service
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
