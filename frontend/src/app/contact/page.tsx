"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  Clock3,
  MessageCircle,
  Phone,
} from "lucide-react";
import "./Contact.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const subject = data.get("subject");
    const message = data.get("message");

    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
    `;

    const mailto = `mailto:info@jambinnoshuttles.co.za?subject=${encodeURIComponent(
      String(subject || "Website enquiry"),
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
    form.reset();
  }

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-pattern" />

        <div className="contact-container contact-hero-content">
          <div className="contact-hero-copy">
            <span className="contact-eyebrow">
              <span />
              WE WOULD LOVE TO HEAR FROM YOU
            </span>

            <h1>
              Let's plan your
              <br />
              <span>next journey.</span>
            </h1>

            <p>
              Whether you are planning an airport transfer, a private tour, or a
              special journey across the Western Cape, our team is ready to help
              you get there.
            </p>

            <div className="contact-hero-actions">
              <a href="#contact-form" className="contact-primary-btn">
                Send us a message
                <ArrowRight size={18} />
              </a>

              <Link href="/booking" className="contact-secondary-link">
                Make a booking
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <div className="contact-hero-art">
            <div className="contact-art-circle contact-art-circle-one" />
            <div className="contact-art-circle contact-art-circle-two" />

            <div className="contact-art-card">
              <span className="contact-art-icon">
                <MessageCircle size={25} />
              </span>
              <span className="contact-art-label">YOUR JOURNEY</span>
              <h3>
                Every great
                <br />
                journey starts
                <br />
                with a conversation.
              </h3>
              <div className="contact-art-line">
                <span />
              </div>
              <p>Let's make your next trip memorable.</p>
            </div>

            <div className="contact-art-decoration">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="contact-hero-bottom">
          <span>JAMBINNO SHUTTLE SERVICES</span>
          <span>YOUR JOURNEY. OUR PRIORITY.</span>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section" id="contact-form">
        <div className="contact-container contact-form-layout">
          <div className="contact-form-copy">
            <span className="contact-section-label">LET'S TALK</span>

            <h2>
              Tell us a little
              <br />
              <span>about your trip.</span>
            </h2>

            <p>
              Share your plans with us. Whether it's a quick airport transfer or
              a longer adventure, we'd love to hear from you.
            </p>

            <div className="contact-form-note">
              <div className="contact-form-note-icon">
                <MessageCircle size={21} />
              </div>
              <div>
                <strong>Not sure where to start?</strong>
                <p>
                  Just send us a message. We'll help you figure out the details.
                </p>
              </div>
            </div>

            <div className="contact-form-email">
              <span>DIRECT EMAIL</span>
              <a href="mailto:info@jambinnoshuttles.co.za">
                info@jambinnoshuttles.co.za
                <ArrowUpRight size={16} />
              </a>

              <span>CALL US</span>
              <a href="tel:+27614217057">
                +27 614 217 057
                <ArrowUpRight size={16} />
              </a>

              <a href="tel:+27766300517">
                +27 766 300 517
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-card-heading">
              <div>
                <span>CONTACT FORM</span>
                <h3>Send us a message</h3>
              </div>
              <div className="contact-form-card-icon">
                <Send size={21} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone number</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+27 ..."
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject *</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="Airport Transfer">Airport Transfer</option>
                    <option value="Private Tour">Private Tour</option>
                    <option value="Wine Tour">Wine Tour</option>
                    <option value="Safari Experience">Safari Experience</option>
                    <option value="Garden Route">Garden Route</option>
                    <option value="Chauffeur Service">Chauffeur Service</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your journey, destination, dates or any questions you have..."
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send your message
                <ArrowRight size={18} />
              </button>

              {submitted && (
                <p className="contact-form-status">
                  Your email app should open with your message ready to send. If
                  it doesn't, email us directly at info@jambinnoshuttles.co.za.
                </p>
              )}

              <p className="contact-form-disclaimer">
                Your details will only be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="contact-bottom-cta">
        <div className="contact-container contact-bottom-content">
          <div>
            <span>READY WHEN YOU ARE</span>
            <h2>
              Your next adventure
              <br />
              starts right here.
            </h2>
          </div>

          <Link href="/booking" className="contact-bottom-btn">
            Plan your journey
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
