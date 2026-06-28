"use client";

import * as React from "react";
import { Wind, Thermometer, AlertTriangle } from "lucide-react";

interface PortAdvisoryProps {
  portName: string;
  weather: {
    weather?: Array<{ description: string }>;
    main?: { temp: number };
    wind?: { speed: number };
  } | null;
}

export const PortAdvisory = React.memo(function PortAdvisory({
  portName,
  weather,
}: PortAdvisoryProps) {
  return (
    <div
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-muted)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--text-primary)" }}>
            Port Advisory
          </h4>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {portName} · {weather?.weather?.[0]?.description ?? "loading conditions"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0, 242, 254, 0.08)" }}>
          <Wind size={18} style={{ color: "var(--accent-neon-blue)" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Thermometer size={18} style={{ color: "var(--accent-pink-primary)" }} />
          <div>
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "block", textTransform: "uppercase", letterSpacing: "0.5px" }}>Air Temp</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)" }}>
              {weather?.main?.temp ?? "--"} °C
            </span>
          </div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px" }}>
          <Wind size={18} style={{ color: "var(--accent-neon-blue)" }} />
          <div>
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "block", textTransform: "uppercase", letterSpacing: "0.5px" }}>Wind</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 500, color: "var(--text-primary)" }}>
              {weather?.wind?.speed ?? "--"} m/s
            </span>
          </div>
        </div>
      </div>

      <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <AlertTriangle size={16} style={{ color: (weather?.wind?.speed ?? 0) > 6 ? "var(--accent-pink-secondary)" : "var(--accent-neon-blue)", marginTop: "2px", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
            {(weather?.wind?.speed ?? 0) > 6
              ? "High winds — secure high-tier containers and cargo cranes."
              : "Calm seas — standard docking and offloading procedures active."}
          </p>
        </div>
      </div>
    </div>
  );
});
