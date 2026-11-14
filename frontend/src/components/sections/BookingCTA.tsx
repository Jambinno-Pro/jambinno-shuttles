import "./BookingCTA.css";

export default function BookingCTA() {
  return (
    <section className="journey-cta-section" id="booking">
      <div className="journey-cta-content">
        <p className="journey-cta-eyebrow">YOUR NEXT JOURNEY STARTS HERE</p>

        <h2 className="journey-cta-title">
          Wherever you're going,
          <br />
          <span>let's get you there.</span>
        </h2>

        <p className="journey-cta-description">
          Tell us where you need to go and we'll help arrange a transport
          solution that suits your journey.
        </p>

        <a href="/contact" className="journey-cta-button">
          Enquire About a Journey <span>↗</span>
        </a>

        <small className="journey-cta-note">
          All bookings are subject to availability and confirmation.
        </small>
      </div>
    </section>
  );
}
