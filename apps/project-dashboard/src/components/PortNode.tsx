"use client";

import * as React from "react";
import type { Port } from "../constants";

function PortNode({
  port,
  isOrigin,
  isDestination,
  isDim,
}: {
  port: Port;
  isOrigin: boolean;
  isDestination: boolean;
  isDim: boolean;
}) {
  const accent = isOrigin
    ? "var(--accent-neon-blue)"
    : isDestination
      ? "var(--accent-pink-primary)"
      : "var(--text-muted)";

  return (
    <g transform={`translate(${port.x}, ${port.y})`} opacity={isDim ? 0.3 : 1}>
      {isDestination && (
        <circle
          r={11}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="6;15;6"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      {isOrigin && (
        <circle
          r={8}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.4"
        >
          <animate
            attributeName="r"
            values="5;11;5"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <circle
        r={isOrigin || isDestination ? (isDestination ? 5 : 4) : 2}
        fill={accent}
        stroke="var(--bg-primary)"
        strokeWidth={isOrigin || isDestination ? 1.5 : 0.5}
      />
      {(!isDim || isOrigin || isDestination) && (
        <>
          <text
            y={port.y > 200 ? 18 : -14}
            textAnchor="middle"
            fill="var(--text-primary)"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: isDim ? "0.55rem" : "0.65rem",
              fontWeight: isOrigin || isDestination ? 600 : 400,
              letterSpacing: "0.3px",
              pointerEvents: "none",
            }}
          >
            {port.name}
          </text>
          <text
            y={port.y > 200 ? 30 : -24}
            textAnchor="middle"
            fill="var(--text-muted)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              pointerEvents: "none",
            }}
          >
            {port.lat.toFixed(1)}°N
          </text>
        </>
      )}
    </g>
  );
}

export { PortNode };
