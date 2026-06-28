"use client";

import * as React from "react";
import { Button, Card, FadeIn, RouteMap, projectPorts, generatePathD, portMap } from "@portfolio/ui";

/* ------------------------------------------------------------------ */
/*  Token bar — raw materials of the system                            */
/* ------------------------------------------------------------------ */

const TOKENS = {
  colors: [
    { name: "bg-primary", value: "#0a0a0c" },
    { name: "accent pink", value: "#e29b9f" },
    { name: "pink secondary", value: "#ff8a9f" },
    { name: "text primary", value: "#e8e6e3" },
    { name: "border", value: "rgba(255,255,255,0.08)" },
  ],
  typefaces: [
    { name: "Display", family: "Space Grotesk", weight: 700 },
    { name: "Body", family: "Outfit", weight: 400 },
    { name: "Code", family: "JetBrains Mono", weight: 400 },
  ],
};

function TokenBar() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        padding: "16px 20px",
        marginBottom: "40px",
        border: "1px solid var(--border-muted)",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.02)",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.65rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginRight: "4px",
        }}
      >
        Palette
      </span>
      {TOKENS.colors.map((c) => (
        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "6px",
              background: c.value,
              border: "1px solid rgba(255,255,255,0.06)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
            }}
          >
            {c.name}
          </span>
        </div>
      ))}
      <span
        style={{
          width: "1px",
          height: "24px",
          background: "var(--border-muted)",
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: "0.65rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginRight: "4px",
        }}
      >
        Type
      </span>
      {TOKENS.typefaces.map((t) => (
        <span
          key={t.name}
          style={{
            fontSize: "0.85rem",
            fontFamily: t.family,
            fontWeight: t.weight,
            color: "var(--text-primary)",
          }}
        >
          {t.family} {t.weight}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Control primitives — instrument-panel aesthetic                    */
/* ------------------------------------------------------------------ */

function Select<T extends string>({
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

function Slider({
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

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = React.useId();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        id={id}
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        style={{
          width: "32px",
          height: "18px",
          borderRadius: "9px",
          border: value
            ? "1px solid var(--accent-pink-primary)"
            : "1px solid rgba(255,255,255,0.1)",
          background: value
            ? "rgba(226,155,159,0.15)"
            : "rgba(255,255,255,0.03)",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.25s ease",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: value ? "15px" : "2px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: value ? "var(--accent-pink-primary)" : "rgba(255,255,255,0.25)",
            transition: "all 0.25s ease",
          }}
        />
      </button>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          fontFamily: "var(--font-mono)",
          cursor: "pointer",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
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
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
          color: "var(--text-primary)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-mono)",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent-pink-primary)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Code block — terminal-style live reflection                        */
/* ------------------------------------------------------------------ */

function CodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span
          style={{
            marginLeft: "12px",
            fontSize: "0.6rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Usage
        </span>
      </div>
      <pre
        style={{
          padding: "16px 20px",
          margin: 0,
          fontSize: "0.78rem",
          lineHeight: 1.7,
          overflowX: "auto",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          background: "rgba(0,0,0,0.25)",
          tabSize: 2,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Specimen card — split preview | controls                           */
/* ------------------------------------------------------------------ */

interface SpecimenCardProps {
  name: string;
  props: string;
  children: React.ReactNode;
  controls: React.ReactNode;
  code: string;
}

function SpecimenCard({ name, props, children, controls, code }: SpecimenCardProps) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
        transition: "border-color 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-mono)",
              color: "var(--accent-pink-primary)",
              background: "rgba(226,155,159,0.1)",
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: "0.3px",
            }}
          >
            {props}
          </span>
        </div>
      </div>

      {/* Preview + Controls split */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          minHeight: "180px",
        }}
      >
        {/* Preview */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            borderRight: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {children}
        </div>
        {/* Controls */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background: "rgba(0,0,0,0.1)",
          }}
        >
          {controls}
        </div>
      </div>

      {/* Live code */}
      <CodeBlock code={code} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-width specimen card (for wide components like RouteMap)       */
/* ------------------------------------------------------------------ */

interface FullSpecimenCardProps {
  name: string;
  props: string;
  children: React.ReactNode;
  controls: React.ReactNode;
  code: string;
}

function FullSpecimenCard({ name, props, children, controls, code }: FullSpecimenCardProps) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-mono)",
              color: "var(--accent-pink-primary)",
              background: "rgba(226,155,159,0.1)",
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: "0.3px",
            }}
          >
            {props}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {controls}
        </div>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
      <CodeBlock code={code} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component playgrounds                                              */
/* ------------------------------------------------------------------ */

function ButtonPlayground() {
  const [variant, setVariant] = React.useState<"primary" | "secondary">("primary");
  const [disabled, setDisabled] = React.useState(false);
  const [text, setText] = React.useState("Click Me");

  const code = `<Button variant="${variant}"${disabled ? "\n  disabled" : ""}>
  ${text || "Click Me"}
</Button>`;

  return (
    <SpecimenCard
      name="Button"
      props={`variant="${variant}"`}
      code={code}
      controls={
        <>
          <Select label="Variant" value={variant} options={["primary", "secondary"]} onChange={setVariant} />
          <TextInput label="Label" value={text} onChange={setText} />
          <Toggle label="Disabled" value={disabled} onChange={setDisabled} />
        </>
      }
    >
      <Button variant={variant} disabled={disabled}>
        {text || "Click Me"}
      </Button>
    </SpecimenCard>
  );
}

function CardPlayground() {
  const [title, setTitle] = React.useState("Project Card");
  const [desc, setDesc] = React.useState("A short description of the project goes here.");
  const [hasLink, setHasLink] = React.useState(false);

  const code = `<Card
  title="${title}"
  description="${desc}"${hasLink ? '\n  href="/"' : ""}
/>`;

  return (
    <SpecimenCard
      name="Card"
      props={`title="${title}"`}
      code={code}
      controls={
        <>
          <TextInput label="Title" value={title} onChange={setTitle} />
          <TextInput label="Description" value={desc} onChange={setDesc} />
          <Toggle label="Link" value={hasLink} onChange={setHasLink} />
        </>
      }
    >
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <Card title={title} description={desc} href={hasLink ? "#" : undefined} />
      </div>
    </SpecimenCard>
  );
}

function FadeInPlayground() {
  const [direction, setDirection] = React.useState<"up" | "down" | "left" | "right" | "none">("up");
  const [delay, setDelay] = React.useState(0);
  const [duration, setDuration] = React.useState(0.5);

  const code = `<FadeIn direction="${direction}" delay={${delay}} duration={${duration}}>
  <div>Animated Content</div>
</FadeIn>`;

  return (
    <SpecimenCard
      name="FadeIn"
      props={`${direction} · ${duration}s`}
      code={code}
      controls={
        <>
          <Select label="Direction" value={direction} options={["up", "down", "left", "right", "none"]} onChange={setDirection} />
          <Slider label="Delay" value={delay} min={0} max={2} step={0.1} onChange={setDelay} />
          <Slider label="Duration" value={duration} min={0.1} max={2} step={0.1} onChange={setDuration} />
        </>
      }
    >
      <FadeIn direction={direction} delay={delay} duration={duration}>
        <div
          style={{
            padding: "16px 28px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, var(--accent-pink-primary), var(--accent-pink-secondary))",
            color: "#000",
            fontWeight: 600,
            fontSize: "0.95rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.3px",
          }}
        >
          Animated Content
        </div>
      </FadeIn>
    </SpecimenCard>
  );
}

/* ------------------------------------------------------------------ */
/*  RouteMap playground                                                */
/* ------------------------------------------------------------------ */

const DEMO_PORTS = projectPorts();
const DEMO_PORT_MAP = portMap(DEMO_PORTS);
const DEMO_ROUTES = [
  {
    id: "route-1",
    name: "Asia-Europe Express",
    origin: DEMO_PORT_MAP.CNSHA,
    destination: DEMO_PORT_MAP.NLRTM,
    pathD: generatePathD(DEMO_PORT_MAP.CNSHA, DEMO_PORT_MAP.NLRTM, DEMO_PORT_MAP.SGPIN),
    vessel: "Cosco Taurus",
    progress: 65,
  },
  {
    id: "route-2",
    name: "Transpacific Eastbound",
    origin: DEMO_PORT_MAP.SGPIN,
    destination: DEMO_PORT_MAP.USLAX,
    pathD: generatePathD(DEMO_PORT_MAP.SGPIN, DEMO_PORT_MAP.USLAX),
    vessel: "Maersk McKinney",
    progress: 40,
  },
  {
    id: "route-3",
    name: "Transatlantic Bridge",
    origin: DEMO_PORT_MAP.NLRTM,
    destination: DEMO_PORT_MAP.USLAX,
    pathD: generatePathD(DEMO_PORT_MAP.NLRTM, DEMO_PORT_MAP.USLAX),
    vessel: "CMA CGM Antoine",
    progress: 80,
  },
];

function RouteMapPlayground() {
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

/* ------------------------------------------------------------------ */
/*  Page layout                                                        */
/* ------------------------------------------------------------------ */

export default function Playground() {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "48px 24px 96px",
      }}
    >
      {/* Back link */}
      <a
        href="/"
        style={{
          color: "var(--text-muted)",
          textDecoration: "none",
          fontSize: "0.8rem",
          fontFamily: "var(--font-mono)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "40px",
          transition: "color 0.2s ease",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-pink-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>&larr;</span> Back to portfolio
      </a>

      {/* Header */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.8rem",
          fontWeight: 700,
          letterSpacing: "-1.2px",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}
      >
        Design<span style={{ color: "var(--accent-pink-primary)" }}>.</span>System
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          marginBottom: "40px",
          maxWidth: "560px",
          fontFamily: "var(--font-sans)",
        }}
      >
        A catalogue of shared UI components — examine each specimen, toggle its
        props, and copy the live usage.
      </p>

      {/* Token bar */}
      <TokenBar />

      {/* Specimens */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <RouteMapPlayground />
        <ButtonPlayground />
        <CardPlayground />
        <FadeInPlayground />
      </div>
    </div>
  );
}
