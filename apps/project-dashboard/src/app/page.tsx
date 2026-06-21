import { Card } from "@portfolio/ui";

export default function DashboardHome() {
  const stats = [
    { title: "Active Users", value: "14,820", trend: "+12.5%" },
    { title: "Monthly Sessions", value: "84,392", trend: "+8.3%" },
    { title: "Conversion Rate", value: "3.24%", trend: "+1.1%" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", padding: "20px 0" }}>
      <header>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "8px"
        }}>
          Analytics Dashboard
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Real-time metrics served by the <code>/project-dashboard</code> microfrontend.
        </p>
      </header>

      {/* Stats Cards Row */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px"
      }}>
        {stats.map((stat, index) => (
          <Card key={index} title={stat.title} description="">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "12px" }}>
              <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {stat.value}
              </span>
              <span style={{
                color: "#10b981",
                fontWeight: 600,
                fontSize: "0.95rem",
                background: "rgba(16, 185, 129, 0.1)",
                padding: "4px 8px",
                borderRadius: "6px"
              }}>
                {stat.trend}
              </span>
            </div>
          </Card>
        ))}
      </section>

      {/* Main Content Area */}
      <section style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-muted)",
        borderRadius: "16px",
        padding: "32px",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "20px" }}>
          Performance Growth Graph
        </h3>
        
        {/* Fake chart visualization lines */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          height: "180px",
          borderLeft: "2px solid var(--border-muted)",
          borderBottom: "2px solid var(--border-muted)",
          paddingLeft: "16px",
          paddingBottom: "8px"
        }}>
          <div style={{ height: "40%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
          <div style={{ height: "65%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
          <div style={{ height: "55%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
          <div style={{ height: "85%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
          <div style={{ height: "70%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
          <div style={{ height: "95%", width: "100%", background: "linear-gradient(to top, rgba(0, 242, 254, 0.1), var(--accent-neon-blue))", borderRadius: "4px 4px 0 0" }}></div>
        </div>
      </section>
    </div>
  );
}
