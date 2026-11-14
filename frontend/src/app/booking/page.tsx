import "./BookingPage.css";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Clock3,
  Headphones,
  MapPin,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";

const services = [
  "Airport Transfer",
  "Hotel Transfer",
  "Private Transfer",
  "Wine Tour",
  "City Sightseeing",
  "Garden Route",
  "Game Drive / Safari",
  "Chauffeur Services",
  "Events Transfer",
  "Private Tour",
  "Other",
];

export default function BookingPage() {
  return (
    <main className="booking-page">
      <div className="booking-page-container">
        {/* LEFT INTRODUCTION */}
        <section className="booking-page-intro">
          <div className="booking-page-eyebrow">
            <span />
            YOUR JOURNEY STARTS HERE
          </div>

          <h1>
            Let's make your
            <br />
            next journey
            <br />
            <span>exceptional.</span>
          </h1>

          <p className="booking-page-description">
            Whether you're arriving in Cape Town, exploring the Winelands,
            heading along the Garden Route or planning a special occasion, we're
            here to make getting there effortless.
          </p>

          <div className="booking-page-features">
            <div className="booking-page-feature">
              <div className="booking-page-feature-icon">
                <ShieldCheck size={21} />
              </div>
              <div>
                <h3>Comfort & Reliability</h3>
                <p>Travel with confidence and peace of mind.</p>
              </div>
            </div>

            <div className="booking-page-feature">
              <div className="booking-page-feature-icon">
                <Clock3 size={21} />
              </div>
              <div>
                <h3>Convenient Travel</h3>
                <p>Journeys arranged around your schedule.</p>
              </div>
            </div>

            <div className="booking-page-feature">
              <div className="booking-page-feature-icon">
                <Headphones size={21} />
              </div>
              <div>
                <h3>Personalised Service</h3>
                <p>Friendly assistance from enquiry to arrival.</p>
              </div>
            </div>
          </div>

          <div className="booking-page-bottom-note">
            <CarFront size={19} />
            <span>More than a ride. A journey to remember.</span>
          </div>
        </section>

        {/* RIGHT BOOKING FORM */}
        <section className="booking-page-form-card">
          <div className="booking-page-form-heading">
            <div>
              <span className="booking-page-form-eyebrow">
                <span />
                PLAN YOUR JOURNEY
              </span>

              <h2>
                Booking <span>request.</span>
              </h2>

              <p>
                Tell us a little about your trip and we'll help arrange the
                right journey for you.
              </p>
            </div>

            <div className="booking-page-heading-icon">
              <MapPinned size={25} />
            </div>
          </div>

          <form className="booking-page-form">
            <div className="booking-page-section-title">
              <span>01</span>
              <h3>Journey details</h3>
            </div>

            <div className="booking-page-fields">
              <div className="booking-page-field">
                <label htmlFor="booking-pickup">Pickup location</label>
                <div className="booking-page-input-wrap">
                  <MapPin size={17} />
                  <input
                    type="text"
                    id="booking-pickup"
                    name="pickup"
                    placeholder="Where are you departing from?"
                    required
                  />
                </div>
              </div>

              <div className="booking-page-field">
                <label htmlFor="booking-destination">Destination</label>
                <div className="booking-page-input-wrap">
                  <MapPinned size={17} />
                  <input
                    type="text"
                    id="booking-destination"
                    name="destination"
                    placeholder="Where would you like to go?"
                    required
                  />
                </div>
              </div>

              <div className="booking-page-field">
                <label htmlFor="booking-date">Travel date</label>
                <div className="booking-page-input-wrap">
                  <CalendarDays size={17} />
                  <input
                    type="date"
                    id="booking-date"
                    name="travelDate"
                    required
                  />
                </div>
              </div>

              <div className="booking-page-field">
                <label htmlFor="booking-passengers">Number of passengers</label>
                <div className="booking-page-input-wrap">
                  <Users size={17} />
                  <select
                    id="booking-passengers"
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

                    <option value="21+">More than 20 passengers</option>
                  </select>
                </div>
              </div>

              <div className="booking-page-field booking-page-field-full">
                <label htmlFor="booking-service">
                  What service do you need?
                </label>
                <div className="booking-page-input-wrap">
                  <CarFront size={18} />
                  <select
                    id="booking-service"
                    name="service"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Choose your preferred service
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="booking-page-form-divider" />

            <div className="booking-page-submit-area">
              <p>
                <ShieldCheck size={16} />
                Your journey details are treated with care.
              </p>

              <button type="submit" className="booking-page-submit">
                Request a Booking
                <ArrowUpRight size={18} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
