"use client";

import * as React from "react";
import Image from "next/image";
import { Button, FadeIn } from "@portfolio/ui";
import dynamic from "next/dynamic";
const Blob = dynamic(() => import("@portfolio/ui/3d").then((mod) => mod.Blob), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="snap-section"
      style={{
        background:
          "radial-gradient(circle at 10% 20%, rgba(226, 155, 159, 0.05) 0%, transparent 40%)",
      }}
    >
      <div className="hero-layout-premium">
        {/* Left Column - Intro details */}
        <div className="hero-left-premium">
          <div>
            <FadeIn>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "4.5rem",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#e29b9f" }}>Hey There,</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>
                  I’m Tareq Sabra!
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} direction="down">
              <h2
                style={{
                  fontSize: "1.25rem",
                  color: "#e29b9f",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginTop: "20px",
                  marginBottom: "8px",
                }}
              >
                Full-Stack Developer
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  maxWidth: "550px",
                }}
              >
                Frontend focused, passionate about building scalable,
                high-performance, and user-centric web applications.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.8} direction="left">
            <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <a href="/dashboard" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  style={{
                    background: "linear-gradient(135deg, #e29b9f, #ff8a9f)",
                    boxShadow: "0 4px 20px rgba(226, 155, 159, 0.2)",
                  }}
                >
                  View Live Demo
                </Button>
              </a>
              <a href="#projects" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Browse Projects</Button>
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="hero-right-premium">
          <Blob />
          <div className="hero-portrait-container">
            <Image
              src="/tareq_sa.png"
              alt="Tareq Sabra Portrait"
              width={800}
              height={800}
              quality={95}
              className="hero-portrait-img"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <a href="#about" className="scroll-indicator">
        <span>Scroll down</span>
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
