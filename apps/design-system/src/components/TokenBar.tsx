"use client";

import { TOKENS } from "../constants/tokens";

export function TokenBar() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        padding: "16px 20px",
        marginBottom: "40px",
        border: "1px solid var(--border-muted)",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.02)",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.65rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginRight: "4px",
        }}
      >
        Palette
      </span>
      {TOKENS.colors.map((c) => (
        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              background: c.value,
              border: "1px solid rgba(255,255,255,0.06)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
            }}
          >
            {c.name}
          </span>
        </div>
      ))}
      <span
        style={{
          width: "1px",
          height: "24px",
          background: "var(--border-muted)",
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: "0.65rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginRight: "4px",
        }}
      >
        Type
      </span>
      {TOKENS.typefaces.map((t) => (
        <span
          key={t.name}
          style={{
            fontSize: "0.85rem",
            fontFamily: t.family,
            fontWeight: t.weight,
            color: "var(--text-primary)",
          }}
        >
          {t.family} {t.weight}
        </span>
      ))}
    </div>
  );
}
