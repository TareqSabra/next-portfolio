"use client";

import * as React from "react";

export function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        id={id}
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        style={{
          width: "32px",
          height: "18px",
          borderRadius: "9px",
          border: value
            ? "1px solid var(--accent-pink-primary)"
            : "1px solid rgba(255,255,255,0.1)",
          background: value
            ? "rgba(226,155,159,0.15)"
            : "rgba(255,255,255,0.03)",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.25s ease",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: value ? "15px" : "2px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: value ? "var(--accent-pink-primary)" : "rgba(255,255,255,0.25)",
            transition: "all 0.25s ease",
          }}
        />
      </button>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          fontFamily: "var(--font-mono)",
          cursor: "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
}
