export function CodeBlock({ code }: { code: string }) {
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
