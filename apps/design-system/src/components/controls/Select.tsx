"use client";

import * as React from "react";

export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  const id = React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
          color: "var(--text-primary)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-sans)",
          outline: "none",
          cursor: "pointer",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8a8a' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          paddingRight: "28px",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent-pink-primary)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
      >
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            style={{ background: "#121214", color: "#e8e6e3" }}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
