"use client";

import * as React from "react";
import { Globe, ShieldCheck } from "lucide-react";

interface CustomsVerificationProps {
  portName: string;
  countryCode: string;
  country: {
    flags?: { png: string };
    name?: { official: string };
    population?: number;
    currencies?: Record<string, { name: string; symbol: string }>;
    languages?: Record<string, string>;
  } | null;
}

export const CustomsVerification = React.memo(function CustomsVerification({
  portName,
  countryCode,
  country,
}: CustomsVerificationProps) {
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
            Customs Verification
          </h4>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {countryCode} · clearing authority
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(226, 155, 159, 0.08)" }}>
          <Globe size={18} style={{ color: "var(--accent-pink-primary)" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {country?.flags?.png && (
          <img
            src={country.flags.png}
            alt={`${portName} flag`}
            style={{
              width: "72px",
              height: "auto",
              borderRadius: "4px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              border: "1px solid var(--border-muted)",
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>Jurisdiction</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>
            {country?.name?.official ?? "Verifying..."}
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            Pop. {country?.population ? country.population.toLocaleString() : "--"}
          </span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-muted)", paddingTop: "12px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Currency</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-mono)", display: "block", marginTop: "2px" }}>
            {country?.currencies ? Object.keys(country.currencies)[0] : "EUR"} (
            {country?.currencies ? (Object.values(country.currencies)[0] as any).symbol : "€"})
          </span>
        </div>

        <div>
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Language</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-mono)", display: "block", marginTop: "2px" }}>
            {country?.languages ? (Object.values(country.languages)[0] as any) : "Dutch"}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0, 242, 254, 0.05)", padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(0, 242, 254, 0.1)" }}>
        <ShieldCheck size={16} style={{ color: "var(--accent-neon-blue)" }} />
        <span style={{ fontSize: "0.72rem", color: "var(--text-primary)", fontWeight: 500 }}>
          Cargo manifests verified
        </span>
      </div>
    </div>
  );
});
