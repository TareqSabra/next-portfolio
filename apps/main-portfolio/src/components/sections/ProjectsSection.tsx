import * as React from 'react';
import { Card } from "@portfolio/ui";

export default function ProjectsSection() {
  return (
    <section id="projects" className="snap-section">
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "2.5rem",
        color: "var(--text-primary)",
        fontWeight: 700,
        letterSpacing: "-0.5px"
      }}>
        Featured Work
      </h2>
      <p style={{ color: "var(--text-secondary)", marginTop: "8px", maxWidth: "600px" }}>
        Decoupled frontend apps served as independent microfrontends in this pnpm monorepo.
      </p>
      
      <div className="featured-grid">
        <Card 
          title="Project Dashboard" 
          description="An interactive real-time analytics dashboard served as a separate Next.js microfrontend application, seamlessly integrated under the /dashboard route."
          href="/dashboard"
        />
        <Card 
          title="Shared UI Component System" 
          description="A design token system and component library built with Vanilla CSS, shared dynamically between the host app and microfrontends."
          href="/design-system"
        />
      </div>

      {/* Scroll Indicator to Contact */}
      <a href="#contact" className="scroll-indicator">
        <span>Get in touch</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </a>
    </section>
  );
}
