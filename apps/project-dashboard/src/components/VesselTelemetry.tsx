"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Compass, ArrowRight } from "lucide-react";
import { Card } from "@portfolio/ui";

interface VesselTelemetryProps {
  vessel: string;
  progress: number;
  originCode: string;
  originName: string;
  destCode: string;
  destName: string;
}

export const VesselTelemetry = React.memo(function VesselTelemetry({
  vessel,
  progress,
  originCode,
  originName,
  destCode,
  destName,
}: VesselTelemetryProps) {
  return (
    <Card title={`Vessel: ${vessel}`} description="Active AIS navigational telemetry from bridge instrumentation.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "16px" }}>
        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)" }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Speed</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 500, color: "var(--accent-neon-blue)", display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <Compass size={14} style={{ color: "var(--accent-neon-blue)" }} />
            19.4 kn
          </div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)" }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>ETA</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 500, color: "var(--text-primary)", marginTop: "4px" }}>
            04 Jul, 18:30 GMT
          </div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-muted)", padding: "12px", borderRadius: "var(--radius-sm)" }}>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Route</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 500, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
            {originCode} <ArrowRight size={10} style={{ color: "var(--accent-pink-primary)" }} /> {destCode}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>
          <span>{originName}</span>
          <span style={{ color: "var(--accent-neon-blue)", fontWeight: 600 }}>Progress {progress}%</span>
          <span>{destName}</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--accent-neon-blue), var(--accent-pink-primary))",
            }}
          />
        </div>
      </div>
    </Card>
  );
});
