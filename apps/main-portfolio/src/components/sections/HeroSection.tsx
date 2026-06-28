"use client";

import * as React from "react";
import Image from "next/image";
import { Button, FadeIn, ScrollIndicator } from "@portfolio/ui";
import dynamic from "next/dynamic";
const Blob = dynamic(() => import("@portfolio/ui/3d").then((mod) => mod.Blob), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="snap-section"
      style={{}}
    >
      <div className="hero-layout-premium">
        {/* Left Column - Intro details */}
        <div className="hero-left-premium">
          <div>
            <FadeIn>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-6xl)",
                  fontWeight: "var(--font-weight-bold)",
                  lineHeight: "var(--leading-tight)",
                  letterSpacing: "-1.5px",
                  marginBottom: "var(--spacing-xs)",
                }}
              >
                <span style={{ color: "var(--accent-pink-primary)" }}>Hey There,</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>
                  I’m Tareq Sabra!
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3} direction="down">
              <h2
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--accent-pink-primary)",
                  fontWeight: "var(--font-weight-semibold)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginTop: "var(--spacing-lg)",
                  marginBottom: "var(--spacing-xs)",
                }}
              >
                Full-Stack Developer
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--leading-relaxed)",
                  maxWidth: "550px",
                }}
              >
                Frontend focused, passionate about building scalable,
                high-performance, and user-centric web applications.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.8} direction="left">
            <div style={{ display: "flex", gap: "var(--spacing-md)", marginTop: "var(--spacing-sm)" }}>
              <a href="/dashboard" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-pink-primary), var(--accent-pink-secondary))",
                    boxShadow: "var(--shadow-glow-pink)",
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
              className="hero-portrait-img"
              priority
            />
          </div>
        </div>
      </div>

      <ScrollIndicator href="#about" label="Scroll down" />
    </section>
  );
}
