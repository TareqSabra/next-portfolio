"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { RouteMap } from "../components/RouteMap";
import { InvoicingPanel } from "../components/InvoicingPanel";
import { PortAdvisory } from "../components/PortAdvisory";
import { CustomsVerification } from "../components/CustomsVerification";
import { VesselTelemetry } from "../components/VesselTelemetry";
import { ROUTES } from "../constants";
import { ROUTE_BASE_RATES } from "../constants/rates";
import {
  useCountry,
  useWeather,
  useExchangeRates,
} from "../hooks/useLogistics";

function formatDate(): string {
  const d = new Date();
  return d
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

export default function LogisticsDashboard() {
  const [selectedRouteId, setSelectedRouteId] =
    React.useState<string>("route-1");

  const activeRoute = ROUTES.find((r) => r.id === selectedRouteId) || ROUTES[0];
  const originPort = activeRoute.origin;
  const destinationPort = activeRoute.destination;

  const { activeData: activeWeather, refetch: refetchWeather } = useWeather(
    destinationPort.name,
  );
  const {
    activeData: activeRates,
    isLoading: isLoadingRates,
    refetch: refetchRates,
  } = useExchangeRates();
  const { activeData: activeOrigin } = useCountry(originPort.countryCode);
  const { activeData: activeDest } = useCountry(destinationPort.countryCode);

  const baseRatePerTEU = ROUTE_BASE_RATES[selectedRouteId] || 4200;

  const handleRefreshAll = () => {
    refetchWeather();
    refetchRates();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        height: "100%",
        paddingBottom: "40px",
      }}
    >
      {/* Log-entry header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
              textWrap: "balance",
            }}
          >
            Port Telemetry
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.3px",
              }}
            >
              {formatDate()}
            </span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "var(--accent-neon-blue)",
                display: "inline-block",
              }}
            />
            <span
              style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
            >
              {originPort.code}{" "}
              <ArrowRight
                size={10}
                style={{
                  display: "inline-flex",
                  verticalAlign: "middle",
                  color: "var(--accent-pink-primary)",
                }}
              />{" "}
              {destinationPort.code}
            </span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "var(--accent-pink-primary)",
                display: "inline-block",
              }}
            />
            <span
              style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}
            >
              VOY-{activeRoute.id.replace("route-", "").padStart(4, "0")}
            </span>
          </div>
        </div>

        <motion.button
          onClick={handleRefreshAll}
          whileHover={{ borderColor: "var(--accent-neon-blue)" }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-muted)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 16px",
            color: "var(--text-primary)",
            fontSize: "0.82rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "var(--transition-smooth)",
          }}
        >
          <RefreshCw size={14} />
          Reload system data
        </motion.button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Left: Map + vessel telemetry */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div style={{ height: "min-content" }}>
            <RouteMap
              selectedRouteId={selectedRouteId}
              onSelectRoute={setSelectedRouteId}
            />
          </div>

          <VesselTelemetry
            vessel={activeRoute.vessel}
            progress={activeRoute.progress}
            originCode={originPort.code}
            originName={originPort.name}
            destCode={destinationPort.code}
            destName={destinationPort.name}
          />
        </div>

        {/* Right: Port advisory, customs, invoicing */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PortAdvisory
            portName={destinationPort.name}
            weather={activeWeather}
          />

          <CustomsVerification
            portName={destinationPort.name}
            countryCode={destinationPort.countryCode}
            country={activeDest}
          />

          <InvoicingPanel
            baseRatePerTEU={baseRatePerTEU}
            rates={activeRates}
            isLoadingRates={isLoadingRates}
            currencyCode={
              activeDest?.currencies
                ? Object.keys(activeDest.currencies)[0]
                : "EUR"
            }
          />
        </div>
      </div>
    </div>
  );
}
