"use client";

import * as React from "react";

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = React.useId();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--accent-pink-primary)",
          }}
        >
          {value.toFixed(1)}s
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          height: "4px",
          appearance: "none",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "2px",
          outline: "none",
          cursor: "pointer",
        }}
        onInput={(e) => {
          const el = e.currentTarget;
          const pct =
            ((parseFloat(el.value) - min) / (max - min)) * 100;
          el.style.background = `linear-gradient(to right, var(--accent-pink-primary) 0%, var(--accent-pink-primary) ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`;
        }}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-pink-primary);
          border: 2px solid #0a0a0c;
          box-shadow: 0 0 0 1px rgba(226,155,159,0.3);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-pink-primary);
          border: 2px solid #0a0a0c;
          box-shadow: 0 0 0 1px rgba(226,155,159,0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
