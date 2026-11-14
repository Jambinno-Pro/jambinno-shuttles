import Image from "next/image";
import Link from "next/link";
import CurrentYear from "./CurrentYear";
import { Apple, Play } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        {/* COLUMN 1: BRAND */}
        <div className="footer-brand">
          <Image
            src="/images/jambinno-logo.png"
            alt="Jambinno Shuttle Services"
            width={180}
            height={70}
            className="footer-logo"
          />

          <p>
            Inspired by Swahili word Twende — “Let’s Go”
            <br />
            Our brand represents movement, discovery and the excitement of
            exploring new destinations. Based in Cape Town, South Africa, we are
            dedicated to connecting people with places, experiences and
            opportunities through thoughtfully arranged transport services.
          </p>
        </div>

        {/* COLUMN 2: EXPLORE */}
        <div className="footer-column">
          <h4>EXPLORE</h4>
          <Link href="/">Home</Link>
          <Link href="/our-story">About Us</Link>
          <Link href="/services">Our Services</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/booking">Make an Enquiry</Link>
        </div>

        {/* COLUMN 3: DOWNLOAD APP */}
        <div className="footer-column footer-app-column">
          <h4>DOWNLOAD OUR APP</h4>

          <p>Take Jambinno with you. Your next journey is just a tap away.</p>

          <Link href="/app-coming-soon" className="footer-app-link">
            <div className="footer-app-icon">
              <Play size={23} fill="currentColor" />
            </div>
            <div className="footer-app-text">
              <small>COMING SOON ON</small>
              <strong>Google Play</strong>
            </div>
          </Link>

          <Link href="/app-coming-soon" className="footer-app-link">
            <div className="footer-app-icon">
              <Apple size={25} />
            </div>
            <div className="footer-app-text">
              <small>COMING SOON ON</small>
              <strong>App Store</strong>
            </div>
          </Link>
        </div>

        {/* COLUMN 4: GET IN TOUCH */}
        <div className="footer-column">
          <h4>GET IN TOUCH</h4>

          <a href="mailto:info@jambinnoshuttles.co.za">
            info@jambinnoshuttles.co.za
          </a>

          <a href="tel:+27614217057">+27 61 421 7057</a>
          <a href="tel:+27766300517">+27 76 630 0517</a>

          <span>Cape Town, South Africa</span>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>
          © <CurrentYear /> Jambinno Shuttle Services. All rights reserved.
        </p>

        <span>YOUR JOURNEY. OUR PRIORITY.</span>
      </div>
    </footer>
  );
}
