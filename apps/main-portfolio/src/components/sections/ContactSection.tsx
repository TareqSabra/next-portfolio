"use client";

import * as React from 'react';
import { Button } from "@portfolio/ui";

export default function ContactSection() {
  return (
    <section id="contact" className="snap-section" style={{ background: "radial-gradient(circle at 10% 80%, rgba(255, 0, 127, 0.05) 0%, transparent 40%)" }}>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "2.5rem",
        color: "var(--text-primary)",
        fontWeight: 700,
        letterSpacing: "-0.5px"
      }}>
        Let's Connect
      </h2>
      <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
        Have a project in mind or want to collaborate? Send a message directly.
      </p>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input className="contact-input" type="text" placeholder="Your Name" required />
        <input className="contact-input" type="email" placeholder="Your Email Address" required />
        <textarea className="contact-input" style={{ minHeight: "120px", resize: "none" }} placeholder="Your Message" required></textarea>
        <Button variant="primary" style={{ width: "fit-content", marginTop: "8px" }}>
          Send Message
        </Button>
      </form>

      {/* Scroll down to Architecture */}
      <a href="#architecture" className="scroll-indicator">
        <span>How it's built</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </a>
    </section>
  );
}
