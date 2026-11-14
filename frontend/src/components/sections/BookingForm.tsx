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

export default function BookingForm() {
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

        <form className="booking-form">
          <div className="booking-fields">
            <div className="booking-field">
              <label htmlFor="pickup">Pickup Location</label>
              <input
                type="text"
                id="pickup"
                name="pickup"
                placeholder="Where are you departing from?"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="Where are you going?"
                required
              />
            </div>

            <div className="booking-field">
              <label htmlFor="travelDate">Travel Date</label>
              <input type="date" id="travelDate" name="travelDate" required />
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
              <select id="service" name="service" defaultValue="" required>
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

            <button type="submit" className="booking-submit">
              Request a Booking
              <span>↗</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
