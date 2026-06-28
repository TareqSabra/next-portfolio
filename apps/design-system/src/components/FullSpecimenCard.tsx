import { CodeBlock } from "./CodeBlock";

interface FullSpecimenCardProps {
  name: string;
  props: string;
  children: React.ReactNode;
  controls: React.ReactNode;
  code: string;
}

export function FullSpecimenCard({ name, props, children, controls, code }: FullSpecimenCardProps) {
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
