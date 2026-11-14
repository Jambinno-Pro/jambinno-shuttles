import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Compass,
  ChevronLeft,
  PawPrint,
  Waves,
  Mountain,
  Wine,
  Plane,
} from "lucide-react";
import "./Destinations.css";

const destinationGroups = [
  {
    id: "cape",
    title: "Cape Town & The Winelands",
    subtitle: "CULTURE · COASTLINES · WINE COUNTRY",
    description:
      "Discover the beauty of Cape Town and the surrounding Winelands, from iconic landmarks and beautiful beaches to historic towns and world-renowned wine estates.",
    icon: Wine,
    destinations: [
      {
        name: "Cape Town",
        image: "/images/destinations/cape-town.png",
        description:
          "Discover Table Mountain, the V&A Waterfront, Camps Bay, the Cape Peninsula and the city's iconic attractions.",
        tag: "THE MOTHER CITY",
      },
      {
        name: "Stellenbosch",
        image: "/images/destinations/stellenbosch.png",
        description:
          "Explore historic streets, beautiful vineyards, world-class wine estates and exceptional restaurants.",
        tag: "WINE COUNTRY",
      },
      {
        name: "Franschhoek",
        image: "/images/destinations/franschhoek.png",
        description:
          "Experience charming village streets, mountain scenery, fine dining and celebrated wine estates.",
        tag: "THE FRENCH CORNER",
      },
      {
        name: "Paarl",
        image: "/images/destinations/paarl.png",
        description:
          "Enjoy scenic mountain landscapes, wine farms and the rich heritage of the Cape Winelands.",
        tag: "HERITAGE & WINE",
      },
      {
        name: "Somerset West",
        image: "/images/destinations/somerset-west.png",
        description:
          "Discover wine estates, mountain scenery and relaxed Cape Winelands hospitality.",
        tag: "CAPE WINELANDS",
      },
      {
        name: "Constantia",
        image: "/images/destinations/constantia.png",
        description:
          "Explore historic wine estates, beautiful gardens and some of Cape Town's most celebrated vineyards.",
        tag: "HERITAGE WINE ROUTE",
      },
      {
        name: "Durbanville",
        image: "/images/destinations/durbanville.png",
        description:
          "Enjoy wine tasting, countryside scenery and welcoming wine estates just outside Cape Town.",
        tag: "DURBANVILLE WINE VALLEY",
      },
      {
        name: "Gordon's Bay",
        image: "/images/destinations/gordons-bay.png",
        description:
          "Explore a picturesque seaside village with beautiful beaches and spectacular coastal drives.",
        tag: "OCEAN VIEWS",
      },
    ],
  },
  {
    id: "coastal",
    title: "Coastal Escapes & Garden Route",
    subtitle: "SCENIC ROADS · BEACHES · NATURAL BEAUTY",
    description:
      "Follow spectacular coastal roads, discover charming seaside towns and experience the Western Cape's beautiful coastline and natural landscapes.",
    icon: Waves,
    destinations: [
      {
        name: "Hermanus",
        image: "/images/destinations/hermanus.png",
        description:
          "Take in beautiful coastal views, explore seaside markets and enjoy whale-watching experiences during the season.",
        tag: "WHALE COAST",
      },
      {
        name: "Arniston",
        image: "/images/destinations/arniston.png",
        description:
          "Discover a peaceful fishing village, white beaches and the spectacular Waenhuiskrans sea cave.",
        tag: "COASTAL HIDEAWAY",
      },
      {
        name: "Cape Agulhas",
        image: "/images/destinations/cape-agulhas.png",
        description:
          "Visit the southernmost tip of Africa and experience its rugged coastline and historic lighthouse.",
        tag: "SOUTHERNMOST AFRICA",
      },
      {
        name: "Swellendam",
        image: "/images/destinations/swellendam.png",
        description:
          "Experience a charming historic town surrounded by mountain scenery, nature reserves and heritage attractions.",
        tag: "COUNTRY ESCAPE",
      },
      {
        name: "Mossel Bay",
        image: "/images/destinations/mossel-bay.png",
        description:
          "Enjoy beautiful beaches, ocean adventures, historic attractions and coastal hospitality.",
        tag: "COASTAL ADVENTURE",
      },
      {
        name: "George",
        image: "/images/destinations/george.png",
        description:
          "Discover the Garden Route's gateway, surrounded by mountains, forests and golf destinations.",
        tag: "GARDEN ROUTE",
      },
      {
        name: "Wilderness",
        image: "/images/destinations/wilderness.png",
        description:
          "Experience peaceful beaches, forests, lagoons and breathtaking natural scenery.",
        tag: "NATURE RETREAT",
      },
      {
        name: "Knysna",
        image: "/images/destinations/knysna.png",
        description:
          "Explore the famous Knysna Lagoon, waterfront, forests and beautiful coastal viewpoints.",
        tag: "LAGOON & FORESTS",
      },
      {
        name: "Plettenberg Bay",
        image: "/images/destinations/plettenberg-bay.png",
        description:
          "Enjoy pristine beaches, ocean views, nature reserves and unforgettable coastal experiences.",
        tag: "BEACH ESCAPE",
      },
      {
        name: "Oudtshoorn",
        image: "/images/destinations/oudtshoorn.png",
        description:
          "Discover the Klein Karoo, Cango Caves, ostrich farms and unique semi-arid landscapes.",
        tag: "KLEIN KAROO",
      },
      {
        name: "West Coast",
        image: "/images/destinations/west-coast.png",
        description:
          "Discover Paternoster, Langebaan, Saldanha Bay and the beautiful Atlantic coastline.",
        tag: "WEST COAST",
      },
      {
        name: "Cederberg",
        image: "/images/destinations/cederberg.png",
        description:
          "Explore dramatic mountain formations, ancient rock art, hiking trails and beautiful wilderness scenery.",
        tag: "MOUNTAIN WILDERNESS",
      },
    ],
  },
  {
    id: "safari",
    title: "Safari & Wildlife Experiences",
    subtitle: "THE WILD SIDE OF THE WESTERN CAPE",
    description:
      "Experience the magic of an African safari without travelling beyond the Western Cape. Discover private game reserves, wildlife and unforgettable guided game drives.",
    icon: PawPrint,
    destinations: [
      {
        name: "Aquila Private Game Reserve",
        image: "/images/destinations/aquila-safari.png",
        description:
          "Experience a Big Five safari in a scenic private reserve within reach of Cape Town.",
        tag: "CAPE TOWN SAFARI",
      },
      {
        name: "Inverdoorn Game Reserve",
        image: "/images/destinations/inverdoorn.png",
        description:
          "Discover a Karoo wildlife experience with guided game drives and beautiful mountain scenery.",
        tag: "KAROO WILDLIFE",
      },
      {
        name: "Sanbona Wildlife Reserve",
        image: "/images/destinations/sanbona.png",
        description:
          "Explore a vast wilderness landscape with wildlife, dramatic mountains and luxury lodge experiences.",
        tag: "KAROO WILDERNESS",
      },
      {
        name: "Gondwana Game Reserve",
        image: "/images/destinations/gondwana.png",
        description:
          "Discover a private game reserve along the Garden Route with diverse wildlife and beautiful landscapes.",
        tag: "GARDEN ROUTE SAFARI",
      },
      {
        name: "Botlierskop Private Game Reserve",
        image: "/images/destinations/botlierskop.png",
        description:
          "Enjoy guided wildlife experiences and scenic mountain views at this private reserve near Mossel Bay.",
        tag: "PRIVATE GAME RESERVE",
      },
      {
        name: "Garden Route Game Lodge",
        image: "/images/destinations/garden-route-game-lodge.png",
        description:
          "Experience guided safari drives and wildlife encounters in the beautiful Albertinia area.",
        tag: "GARDEN ROUTE WILDLIFE",
      },
      {
        name: "Buffelsdrift Game Lodge",
        image: "/images/destinations/buffelsdrift.png",
        description:
          "Enjoy a unique Klein Karoo wildlife experience close to Oudtshoorn.",
        tag: "KLEIN KAROO SAFARI",
      },
    ],
  },
];

function DestinationCard({
  destination,
}: {
  destination: {
    name: string;
    image: string;
    description: string;
    tag: string;
  };
}) {
  return (
    <article className="destination-card">
      <div
        className="destination-card-image"
        style={{ backgroundImage: `url("${destination.image}")` }}
      >
        <span className="destination-card-tag">
          <MapPin size={13} />
          {destination.tag}
        </span>
      </div>

      <div className="destination-card-content">
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>

        <Link
          href={`/booking?destination=${encodeURIComponent(destination.name)}`}
          className="destination-card-link"
        >
          Enquire about this destination
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function DestinationsPage() {
  return (
    <main className="destinations-page">
      {/* HERO */}
      <section className="destinations-hero">
        <div className="destinations-hero-overlay" />

        <div className="destinations-container destinations-hero-content">
          <Link href="/" className="destinations-back-home">
            <ChevronLeft size={17} />
            Back to Home
          </Link>

          <span className="destinations-eyebrow">
            EXPLORE SOUTH AFRICA WITH JAMBiNNO
          </span>

          <h1>
            Every destination
            <br />
            <span>has a story.</span>
          </h1>

          <p>
            From the Cape's breathtaking coastline to the wild landscapes of
            Africa, discover remarkable places and make every journey
            unforgettable.
          </p>

          <Link href="/booking" className="destinations-hero-button">
            Plan Your Journey
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="destinations-intro">
        <div className="destinations-container">
          <div className="destinations-intro-top">
            <div>
              <span className="destinations-eyebrow">
                YOUR JOURNEY BEGINS HERE
              </span>
              <h2>
                Discover more.
                <br />
                <span>Experience Africa.</span>
              </h2>
            </div>

            <p>
              Whether you are planning an airport transfer, a wine-country
              escape, a coastal holiday or a wildlife adventure, Jambinno helps
              you get there in comfort and style.
            </p>
          </div>

          <div className="destinations-highlights">
            <div>
              <Wine size={25} />
              <span>Cape Winelands</span>
            </div>
            <div>
              <Waves size={25} />
              <span>Coastal Escapes</span>
            </div>
            <div>
              <PawPrint size={25} />
              <span>Safari Experiences</span>
            </div>
            <div>
              <Plane size={25} />
              <span>Private Transfers</span>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION COLLECTIONS */}
      {destinationGroups.map((group, index) => {
        const GroupIcon = group.icon;

        return (
          <section
            className={`destination-group ${
              index % 2 === 1 ? "destination-group-alt" : ""
            }`}
            id={group.id}
            key={group.id}
          >
            <div className="destinations-container">
              <div className="destination-group-heading">
                <div className="destination-group-title">
                  <div className="destination-group-icon">
                    <GroupIcon size={25} />
                  </div>

                  <div>
                    <span className="destinations-eyebrow">
                      {group.subtitle}
                    </span>
                    <h2>{group.title}</h2>
                  </div>
                </div>

                <p>{group.description}</p>
              </div>

              <div className="destinations-grid">
                {group.destinations.map((destination) => (
                  <DestinationCard
                    key={destination.name}
                    destination={destination}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CUSTOM JOURNEYS */}
      <section className="destinations-custom">
        <div className="destinations-container destinations-custom-content">
          <span className="destinations-eyebrow">YOUR JOURNEY, YOUR WAY</span>

          <h2>
            Can't find your
            <br />
            <span>destination?</span>
          </h2>

          <p>
            Have somewhere else in mind? Tell us where you would like to go. We
            can discuss a personalised transfer or travel arrangement around
            your journey.
          </p>

          <Link href="/booking" className="destinations-hero-button">
            Request a Custom Journey
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
