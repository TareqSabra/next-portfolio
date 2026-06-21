"use client";

import * as React from "react";
import { FadeIn } from "@portfolio/ui";
import { PDFViewer } from "@portfolio/ui/pdf";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-section"
      style={{
        background:
          "radial-gradient(circle at 10% 50%, rgba(226, 155, 159, 0.05) 0%, transparent 40%)",
      }}
    >
      <div className="about-layout">
        {/* Left Column - About narrative */}
        <div style={{ flex: 1.1, textAlign: "left" }}>
          <FadeIn direction="up">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.8rem",
                color: "var(--text-primary)",
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: "20px",
              }}
            >
              About <span style={{ color: "#e29b9f" }}>Me</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              I am a frontend-focused engineer passionate about building
              performant, scalable, and user-centric web applications. My
              approach blends strong React and modern frontend fundamentals with
              a deep interest in AI-driven development, including RAG systems,
              real-time streaming, and conversational interfaces. I leverage
              AI-assisted workflows to accelerate delivery while maintaining
              high standards of quality, performance, and maintainability.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              Currently, I am expanding my expertise to backend development with
              Node.js, Express.js, and databases using Supabase. I am also
              familiar with Python and FastAPI, and I'm highly motivated to
              explore cutting-edge fields like Large Language Models (LLMs) and
              other advanced AI technologies.
            </p>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              Beyond core coding, I thrive on continuous learning and am always
              eager to explore emerging technologies
            </p>
          </FadeIn>
        </div>

        {/* Right Column - Skill Categories */}
        <div style={{ flex: 0.9, width: "100%" }}>
          <FadeIn delay={0.3} direction="down">
            <PDFViewer pdfUrl="/cv.pdf" />
          </FadeIn>
        </div>
      </div>

      {/* Scroll down to Projects */}
      <a href="#projects" className="scroll-indicator">
        <span>Featured Work</span>
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
