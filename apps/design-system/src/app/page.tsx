"use client";

import { TokenBar } from "../components/TokenBar";
import { BlobPlayground } from "../components/playgrounds/BlobPlayground";
import { ButtonPlayground } from "../components/playgrounds/ButtonPlayground";
import { FlowPlayground } from "../components/playgrounds/FlowPlayground";
import { CardPlayground } from "../components/playgrounds/CardPlayground";
import { FadeInPlayground } from "../components/playgrounds/FadeInPlayground";
import { RouteMapPlayground } from "../components/playgrounds/RouteMapPlayground";

export default function Playground() {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "48px 24px 96px",
      }}
    >
      <a
        href="/"
        style={{
          color: "var(--text-muted)",
          textDecoration: "none",
          fontSize: "0.8rem",
          fontFamily: "var(--font-mono)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "40px",
          transition: "color 0.2s ease",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-pink-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>&larr;</span> Back to portfolio
      </a>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.8rem",
          fontWeight: 700,
          letterSpacing: "-1.2px",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}
      >
        Design<span style={{ color: "var(--accent-pink-primary)" }}>.</span>System
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          marginBottom: "40px",
          maxWidth: "100%",
          fontFamily: "var(--font-sans)",
        }}
      >
        A catalogue of shared UI components — examine each specimen, toggle its
        props, and copy the live usage. Built with shadcn/ui, motion, React
        Three Fiber, and Next.js 16.
      </p>

      <TokenBar />

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <BlobPlayground />
        <FlowPlayground />
        <RouteMapPlayground />
        <ButtonPlayground />
        <CardPlayground />
        <FadeInPlayground />
      </div>
    </div>
  );
}
