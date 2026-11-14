import "./About.css";

export default function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-image"></div>
          <div className="about-image-caption">
            <span>THE ART OF THE JOURNEY</span>
            <span>EST. JAMBINNO</span>
          </div>
        </div>

        <div className="about-content">
          <p className="eyebrow">A DIFFERENT WAY TO TRAVEL</p>

          <h2 className="section-title">
            More than transport.
            <br />
            <span className="gold-text">It's the experience.</span>
          </h2>

          <p>
            At Twende Jambinno Shuttle, we believe a great journey begins long
            before you reach your destination. It begins with thoughtful
            planning, dependable arrangements and a genuine commitment to your
            comfort.
          </p>

          <p>
            Inspired by the word <strong>Twende</strong> meaning —{" "}
            <strong>“Let's Go”</strong>
            our name represents a spirit of movement, discovery and adventure.
            Rooted in the warmth of African hospitality, we aim to make every
            travel experience feel personal, effortless and memorable. Whether
            you're arriving in Cape Town, exploring the Winelands, discovering
            the Garden Route or travelling to your next destination, we're here
            to make the journey as special as the place you're going.
          </p>

          <a href="/our-story" className="text-link">
            Discover More About Jambinno <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
