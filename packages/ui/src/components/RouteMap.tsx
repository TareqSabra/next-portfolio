"use client";

import * as React from "react";
import { motion } from "motion/react";
import type { Port } from "../lib/ports";

export interface RouteMapRoute {
  id: string;
  name: string;
  origin: Port;
  destination: Port;
  pathD: string;
  status?: string;
  vessel?: string;
  progress?: number;
}

interface PortNodeProps {
  port: Port;
  isOrigin: boolean;
  isDestination: boolean;
  isDim: boolean;
}

function PortNode({ port, isOrigin, isDestination, isDim }: PortNodeProps) {
  const accent = isOrigin
    ? "var(--accent-neon-blue)"
    : isDestination
      ? "var(--accent-pink-primary)"
      : "var(--text-muted)";

  return (
    <g transform={`translate(${port.x}, ${port.y})`} opacity={isDim ? 0.3 : 1}>
      {isDestination && (
        <circle r={11} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="6;15;6" dur="2.5s" repeatCount="indefinite" />
        </circle>
      )}
      {isOrigin && (
        <circle r={8} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="5;11;5" dur="2.5s" repeatCount="indefinite" />
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

export interface RouteMapProps {
  routes: RouteMapRoute[];
  ports: Port[];
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  title?: string;
  subtitle?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  routes,
  ports,
  selectedRouteId,
  onSelectRoute,
  title,
  subtitle,
}) => {
  const selectedRoute = routes.find((r) => r.id === selectedRouteId);
  const [vb, setVb] = React.useState({ x: 0, y: 0, w: 800, h: 360 });
  const [hoveredRouteId, setHoveredRouteId] = React.useState<string | null>(null);

  function zoomAt(factor: number, cx?: number, cy?: number) {
    setVb((prev) => {
      const centerX = cx ?? prev.x + prev.w / 2;
      const centerY = cy ?? prev.y + prev.h / 2;
      const newW = Math.min(800, Math.max(50, prev.w * factor));
      const newH = Math.min(360, Math.max(28, prev.h * factor));
      const newX = Math.max(0, Math.min(800 - newW, centerX - newW / 2));
      const newY = Math.max(0, Math.min(360 - newH, centerY - newH / 2));
      return { x: newX, y: newY, w: newW, h: newH };
    });
  }

  const mapRef = React.useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const vbRef = React.useRef(vb);
  vbRef.current = vb;
  const dragRef = React.useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startVbX: number;
    startVbY: number;
  }>({ active: false, startX: 0, startY: 0, startVbX: 0, startVbY: 0 });

  React.useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const pctX = (e.clientX - rect.left) / rect.width;
      const pctY = (e.clientY - rect.top) / rect.height;
      setVb((prev) => {
        const svgX = prev.x + pctX * prev.w;
        const svgY = prev.y + pctY * prev.h;
        const factor = e.deltaY > 0 ? 1.2 : 0.8;
        const newW = Math.min(800, Math.max(50, prev.w * factor));
        const newH = Math.min(360, Math.max(28, prev.h * factor));
        const newX = Math.max(0, Math.min(800 - newW, svgX - newW / 2));
        const newY = Math.max(0, Math.min(360 - newH, svgY - newH / 2));
        return { x: newX, y: newY, w: newW, h: newH };
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      const cur = vbRef.current;
      dragRef.current.active = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.startVbX = cur.x;
      dragRef.current.startVbY = cur.y;
      setIsPanning(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const cur = vbRef.current;
      const rect = el.getBoundingClientRect();
      const scaleX = cur.w / rect.width;
      const scaleY = cur.h / rect.height;
      setVb((prev) => ({
        x: Math.max(0, Math.min(800 - prev.w, dragRef.current.startVbX - dx * scaleX)),
        y: Math.max(0, Math.min(360 - prev.h, dragRef.current.startVbY - dy * scaleY)),
        w: prev.w,
        h: prev.h,
      }));
    };

    const onMouseUp = () => {
      dragRef.current.active = false;
      setIsPanning(false);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const isZoomed = vb.w < 800 || vb.h < 360;
  const zoomLevel = Math.round((800 / vb.w) * 100);

  const selectRoute = onSelectRoute || (() => {});

  return (
    <div
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--border-muted)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-md)",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--spacing-xs)",
          zIndex: 10,
        }}
      >
        <div>
          {title && (
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--text-primary)",
                textWrap: "balance",
              }}
            >
              {title}
            </h4>
          )}
          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-secondary)",
                marginTop: "2px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isZoomed && (
            <motion.button
              onClick={() => setVb({ x: 0, y: 0, w: 800, h: 360 })}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-muted)",
                borderRadius: "var(--radius-xs)",
                color: "var(--text-secondary)",
                fontSize: "0.6rem",
                fontFamily: "var(--font-mono)",
                padding: "6px 12px",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
              }}
              title="Reset zoom"
            >
              Reset {zoomLevel}%
            </motion.button>
          )}
          <div style={{ display: "flex", gap: "2px" }}>
            <motion.button
              onClick={() => zoomAt(0.8)}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-muted)",
                borderRadius: "var(--radius-xs)",
                color: "var(--text-primary)",
                width: "28px",
                height: "28px",
                padding: 0,
                fontSize: "1rem",
                lineHeight: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-smooth)",
              }}
              title="Zoom in"
            >
              +
            </motion.button>
            <motion.button
              onClick={() => zoomAt(1.2)}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-muted)",
                borderRadius: "var(--radius-xs)",
                color: "var(--text-primary)",
                width: "28px",
                height: "28px",
                padding: 0,
                fontSize: "1rem",
                lineHeight: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-smooth)",
              }}
              title="Zoom out"
            >
              &minus;
            </motion.button>
          </div>
        </div>
      </div>

      {/* SVG Map */}
      <div
        style={{
          flex: 1,
          minHeight: "260px",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
        }}
      >
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(10, 10, 15, 0.2)",
              cursor: isPanning ? "grabbing" : "grab",
              borderRadius: "var(--radius-md)",
            }}
          >
            <defs>
              <pattern id="routingrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#routingrid)" />

            {/* Abstract continental landmasses */}
            <g opacity="0.04" stroke="var(--text-secondary)" strokeWidth="0.5" fill="none">
              <circle cx="150" cy="120" r="80" />
              <circle cx="200" cy="160" r="60" />
              <circle cx="380" cy="90" r="50" />
              <circle cx="420" cy="120" r="60" />
              <circle cx="600" cy="160" r="90" />
              <circle cx="650" cy="200" r="70" />
              <circle cx="450" cy="240" r="70" />
            </g>

            {/* Route paths */}
            {routes.map((route) => {
              const isSelected = route.id === selectedRouteId;
              const isHovered = hoveredRouteId === route.id;
              const accent = isSelected || isHovered
                ? "var(--accent-pink-primary)"
                : "var(--text-muted)";
              return (
                <g
                  key={route.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => selectRoute(route.id)}
                  onMouseEnter={() => setHoveredRouteId(route.id)}
                  onMouseLeave={() => setHoveredRouteId(null)}
                >
                  <path
                    d={route.pathD}
                    fill="none"
                    stroke={accent}
                    strokeWidth={isSelected ? 5 : isHovered ? 3 : 1.5}
                    opacity={isSelected ? 0.2 : isHovered ? 0.35 : 0.12}
                    style={{ transition: "var(--transition-smooth)" }}
                  />
                  <path
                    d={route.pathD}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1.5}
                    strokeDasharray="5,4"
                    opacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.35}
                    style={{ transition: "var(--transition-smooth)" }}
                  >
                    {!isSelected && (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-9"
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    )}
                  </path>
                </g>
              );
            })}

            {/* Animated vessel markers */}
            {routes.map((route) => {
              if (route.id !== selectedRouteId || !route.progress) return null;
              return (
                <motion.g
                  key={`vessel-${route.id}`}
                  style={{
                    offsetPath: `path('${route.pathD}')`,
                    offsetDistance: `${route.progress}%`,
                    transformOrigin: "center",
                  }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle
                    cx="0" cy="0" r="14"
                    fill="none" stroke="var(--accent-pink-primary)"
                    strokeWidth="1" opacity="0.5"
                  >
                    <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <polygon
                    points="-5,7 0,-7 5,7 0,4"
                    fill="var(--accent-pink-primary)"
                    stroke="#0a0a0c"
                    strokeWidth="1"
                    style={{ transform: "rotate(90deg)" }}
                  />
                  <circle cx="0" cy="0" r="2.5" fill="#f3f4f6" />
                </motion.g>
              );
            })}

            {/* Port nodes */}
            {ports.map((port) => {
              const isOrigin = selectedRoute?.origin.id === port.id;
              const isDestination = selectedRoute?.destination.id === port.id;
              const isDim = !isOrigin && !isDestination;
              return (
                <PortNode
                  key={port.id}
                  port={port}
                  isOrigin={isOrigin}
                  isDestination={isDestination}
                  isDim={isDim}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Route selector */}
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-sm)",
          marginTop: "var(--spacing-xs)",
          borderTop: "1px solid var(--border-muted)",
          paddingTop: "var(--spacing-sm)",
          flexWrap: "wrap",
        }}
      >
        {routes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <motion.button
              key={route.id}
              onClick={() => selectRoute(route.id)}
              whileTap={{ scale: 0.96 }}
              style={{
                background: isSelected
                  ? "rgba(226, 155, 159, 0.08)"
                  : "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${isSelected ? "var(--accent-pink-primary)" : "var(--border-muted)"}`,
                borderRadius: "var(--radius-sm)",
                padding: "8px 14px",
                color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: "0.78rem",
                fontWeight: isSelected ? 600 : 400,
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                flex: "1 1 200px",
              }}
            >
              {route.vessel && (
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: isSelected ? "var(--accent-pink-primary)" : "var(--text-muted)",
                    marginBottom: "2px",
                  }}
                >
                  {route.vessel}
                </span>
              )}
              <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-sans)" }}>
                {route.name}
              </span>
              <span
                style={{
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  marginTop: "3px",
                  letterSpacing: "0.2px",
                }}
              >
                {route.origin.code} &rarr; {route.destination.code}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
