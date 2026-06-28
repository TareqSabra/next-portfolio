"use client";

import * as React from "react";
import { RouteMap } from "@portfolio/ui";
import { DEMO_ROUTES, DEMO_PORTS } from "../../constants/demo-routes";
import { FullSpecimenCard } from "../FullSpecimenCard";

export function RouteMapPlayground() {
  const [selected, setSelected] = React.useState("route-1");

  const code = `<RouteMap
  routes={[
    { id: "route-1", name: "Asia-Europe Express", ... },
    { id: "route-2", name: "Transpacific Eastbound", ... },
    { id: "route-3", name: "Transatlantic Bridge", ... },
  ]}
  ports={projectPorts()}
  selectedRouteId="${selected}"
  title="Global Shipping Network"
/>`;

  return (
    <FullSpecimenCard
      name="RouteMap"
      props={`${DEMO_ROUTES.length} routes · ${DEMO_PORTS.length} ports`}
      code={code}
      controls={
        <>
          {DEMO_ROUTES.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              style={{
                fontSize: "0.6rem",
                fontFamily: "var(--font-mono)",
                padding: "4px 10px",
                borderRadius: "4px",
                border: selected === r.id ? "1px solid var(--accent-pink-primary)" : "1px solid rgba(255,255,255,0.06)",
                background: selected === r.id ? "rgba(226,155,159,0.1)" : "transparent",
                color: selected === r.id ? "var(--accent-pink-primary)" : "var(--text-muted)",
                cursor: "pointer",
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
            >
              {r.origin.code}&rarr;{r.destination.code}
            </button>
          ))}
        </>
      }
    >
      <RouteMap
        routes={DEMO_ROUTES}
        ports={DEMO_PORTS}
        selectedRouteId={selected}
        onSelectRoute={setSelected}
        title="Global Shipping Network"
        subtitle="3 active routes · interactive zoom and pan"
      />
    </FullSpecimenCard>
  );
}
