"use client";

import * as React from "react";
import { motion } from "motion/react";

export interface CoinGeckoRates {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  usdCoin?: { usd: number } | { usd: number };
  eur?: number;
}

interface InvoicingPanelProps {
  baseRatePerTEU: number;
  rates: any;
  isLoadingRates: boolean;
  currencyCode: string;
}

import { SuccessModal } from "./SuccessModal";
import { INSURANCE_FEE, CUSTOMS_FEE, FALLBACK_RATES, CURRENCY_CONFIG } from "../constants/financial";

export const InvoicingPanel: React.FC<InvoicingPanelProps> = ({
  baseRatePerTEU,
  rates,
  isLoadingRates,
  currencyCode,
}) => {
  const [teus, setTeus] = React.useState<number>(10);
  const [insurance, setInsurance] = React.useState<boolean>(true);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const portInsuranceFee = insurance ? INSURANCE_FEE : 0;
  const customsClearingFee = CUSTOMS_FEE;
  const totalUSD = teus * (baseRatePerTEU + portInsuranceFee + customsClearingFee);

  const btcPrice = rates?.bitcoin?.usd || FALLBACK_RATES.bitcoin.usd;
  const ethPrice = rates?.ethereum?.usd || FALLBACK_RATES.ethereum.usd;
  const usdCoinPrice = rates?.["usd-coin"]?.usd || FALLBACK_RATES["usd-coin"].usd;
  const eurRate = rates?.eur || FALLBACK_RATES.eur;

  const totalBTC = totalUSD / btcPrice;
  const totalETH = totalUSD / ethPrice;
  const totalUSDC = totalUSD / usdCoinPrice;
  const totalEUR = totalUSD * eurRate;

  const localCurrencySymbol = CURRENCY_CONFIG[currencyCode]?.symbol || "¥";
  let localConversionRate = 7.25;

  if (currencyCode === "EUR") {
    localConversionRate = eurRate;
  } else if (currencyCode === "SGD") {
    localConversionRate = 1.35;
  } else if (currencyCode === "CNY") {
    localConversionRate = 7.25;
  } else if (currencyCode === "USD") {
    localConversionRate = 1;
  }

  const totalLocal = totalUSD * localConversionRate;

  return (
    <div
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-muted)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-md)",
        height: "100%",
      }}
    >
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 600 }}>
          Freight Calculator
        </h4>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: "2px" }}>
          Container load, customs, and exchange rates
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", background: "rgba(255,255,255,0.01)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Container load (TEUs)
          </label>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "1rem", color: "var(--accent-pink-primary)" }}>
            {teus}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="120"
          value={teus}
          onChange={(e) => setTeus(parseInt(e.target.value))}
          style={{
            width: "100%",
            accentColor: "var(--accent-pink-primary)",
            background: "rgba(255,255,255,0.1)",
            height: "5px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--spacing-xs)" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Rate per container
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
            ${baseRatePerTEU.toLocaleString()} USD
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "var(--spacing-xs)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "12px",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => setInsurance(!insurance)}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "3px",
              border: "1px solid var(--accent-pink-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: insurance ? "var(--accent-pink-primary)" : "transparent",
              transition: "var(--transition-fast)",
            }}
          >
            {insurance && <span style={{ color: "#0a0a0c", fontSize: "0.65rem", fontWeight: "bold" }}>✓</span>}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Marine risk insurance ($250/TEU)
          </span>
        </div>
      </div>

      {/* Cost breakdown */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "var(--spacing-md)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            <span>Base freight</span>
            <span>${(teus * baseRatePerTEU).toLocaleString()} USD</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              fontFamily: "var(--font-mono)",
              color: insurance ? "var(--text-secondary)" : "var(--text-muted)",
              opacity: insurance ? 1 : 0.4,
              transition: "opacity 0.3s ease, color 0.3s ease",
            }}
          >
            <span>Insurance {!insurance && "(excluded)"}</span>
            <span>{insurance ? `+$${(teus * 250).toLocaleString()}` : "$0"} USD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            <span>Customs & entry fees</span>
            <span>+${(teus * customsClearingFee).toLocaleString()} USD</span>
          </div>

          <div style={{ height: "1px", background: "var(--border-muted)", margin: "8px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem" }}>Total logistics cost</span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "1.3rem", color: "var(--accent-pink-primary)" }}>
              ${totalUSD.toLocaleString()} <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 400 }}>USD</span>
            </span>
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ borderTop: "1px solid var(--border-muted)", paddingTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-secondary)" }}>
              Payment methods
            </span>
            {isLoadingRates ? (
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Updating rates</span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--accent-neon-blue)" }}>
                <span style={{ width: "4px", height: "4px", background: "var(--accent-neon-blue)", borderRadius: "50%", display: "inline-block" }} />
                Rates live
              </span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-muted)", borderRadius: "var(--radius-sm)", padding: "8px 10px" }}>
              <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                {currencyCode} ({localCurrencySymbol})
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)", marginTop: "2px" }}>
                {localCurrencySymbol} {totalLocal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-muted)", borderRadius: "var(--radius-sm)", padding: "8px 10px" }}>
              <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                USDC
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-primary)", marginTop: "2px" }}>
                {totalUSDC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-muted)", borderRadius: "var(--radius-sm)", padding: "8px 10px" }}>
              <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                ETH
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500, color: "var(--accent-neon-blue)", marginTop: "2px" }}>
                Ξ {totalETH.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-muted)", borderRadius: "var(--radius-sm)", padding: "8px 10px" }}>
              <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                BTC
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500, color: "var(--accent-pink-primary)", marginTop: "2px" }}>
                ₿ {totalBTC.toLocaleString(undefined, { minimumFractionDigits: 5, maximumFractionDigits: 5 })}
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "linear-gradient(135deg, var(--accent-pink-primary), var(--accent-pink-secondary))",
            color: "#000",
            border: "none",
            borderRadius: "var(--radius-sm)",
            padding: "12px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            width: "100%",
            textAlign: "center",
          }}
          onClick={() => setShowSuccess(true)}
        >
          Issue freight invoice
        </motion.button>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        teus={teus}
        totalUSD={totalUSD}
      />
    </div>
  );
};
