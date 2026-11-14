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
            At Jambinno Shuttle Services, we believe a great journey begins long
            before you reach your destination. It begins with thoughtful
            planning, dependable arrangements and a genuine commitment to your
            comfort.
          </p>

          <p>
            Inspired by the warmth of African hospitality, we aim to make every
            travel experience feel personal, effortless and memorable.
          </p>

          <a href="#contact" className="text-link">
            Discover Jambinno <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
