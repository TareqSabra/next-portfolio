"use client";

import * as React from "react";
import { motion } from "motion/react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Connect" },
  { id: "architecture", label: "Stack" },
];

export default function KeyboardNav() {
  const [activeId, setActiveId] = React.useState("hero");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        width: "72px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        background: "transparent",
        position: "relative",
        zIndex: 10,
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav-content {
            width: 32px !important;
            position: fixed !important;
            left: 0 !important;
            top: 50% !important;
            translate: 0 -50% !important;
            background: rgba(10,10,20,0.6) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border-radius: 0 12px 12px 0 !important;
            padding: 12px 6px !important;
            gap: 16px !important;
            z-index: 9999 !important;
          }
          .desktop-nav-dot.active {
            width: 16px !important;
            height: 2px !important;
          }
          .desktop-nav-dot {
            width: 6px !important;
            height: 6px !important;
          }
        }
      `}</style>
      <div
        className="desktop-nav-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          const isHovered = hoveredId === s.id;
          const show = isActive || isHovered;

          return (
            <motion.button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileTap={{ scale: 0.92 }}
              title={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "8px 0",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                position: "relative",
                fontFamily: "var(--font-sans)",
                color: show ? "var(--text-primary)" : "var(--text-muted)",
                fontSize: "var(--text-xs)",
                fontWeight: show ? 600 : 400,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  className={`desktop-nav-dot${isActive ? " active" : ""}`}
                  style={{
                    width: isActive ? "24px" : "8px",
                    height: isActive ? "2px" : "6px",
                    borderRadius: isActive ? "2px" : "50%",
                    background: isActive
                      ? "linear-gradient(90deg, var(--accent-pink-primary), var(--accent-pink-secondary))"
                      : isHovered
                        ? "var(--accent-pink-primary)"
                        : "var(--text-muted)",
                    opacity: isActive ? 1 : isHovered ? 0.6 : 0.35,
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0,
                  }}
                />
                <motion.span
                  initial={false}
                  animate={{
                    opacity: show ? 1 : 0,
                    x: show ? 0 : -6,
                  }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: "absolute",
                    left: "calc(100% + 8px)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    display: "none",
                  }}
                  className="desktop-nav-label"
                >
                  {s.label}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </div>
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav-label {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
