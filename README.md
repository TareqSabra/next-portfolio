# Global Maritime Logistics Dashboard

A real-time maritime telemetry and freight management platform that visualizes global shipping routes, tracks vessel movements, monitors port conditions, and calculates multimodal freight costs.

---

## The Business Domain

### Why Maritime Logistics Matters

Maritime shipping moves **90% of global trade** by volume — roughly 11 billion tons of cargo per year across 50,000+ merchant vessels. Every manufactured good, commodity, and raw material spends time on a container ship. The industry operates on razor-thin margins where a single delay at a port can cascade into weeks of disrupted supply chains.

Three converging trends make this space critical today:

- **Supply chain fragility** — Post-pandemic, port congestion, weather disruptions, and geopolitical events regularly ripple through global logistics. Real-time visibility is no longer a luxury.
- **The data explosion** — Modern vessels generate terabytes of telemetry (AIS position pings, engine sensors, weather routing, ECDIS logs). The challenge is turning that firehose into actionable information.
- **Decarbonization pressure** — The IMO's 2030/2050 emissions targets are forcing carriers to optimize every knot. Route optimization, speed management, and port efficiency directly affect carbon intensity ratings.

### What This Dashboard Does

This dashboard is a **command center prototype** for a logistics operations team. It consolidates four workflows that are typically spread across disconnected systems:

| Workflow | Typical Tooling | This Dashboard |
|----------|----------------|----------------|
| Vessel tracking | AIS platforms (MarineTraffic, VesselFinder) | SVG route map with real-time position, ETA, and progress |
| Port intelligence | Weather services + port authority websites | Integrated weather advisory per destination port |
| Customs compliance | Country databases + manual lookup | Flag, jurisdiction, currency, language — one click |
| Freight costing | Spreadsheets + rate sheets | Dynamic calculator with live FX and multi-currency checkout |

---

## How the Dashboard Maps to Real Operations

### 1. Route Map — Global Fleet Visibility

**Business problem**: A logistics coordinator needs to see, at a glance, where every active vessel is, what route it's on, and its status.

The map shows **9 major shipping routes** across 20 ports — Shanghai→Rotterdam, Singapore→Los Angeles, Rotterdam→New York, and others. Each route is a real SVG path computed from lat/lon coordinates using a calibrated Mercator projection.

- **Vessel markers** move along route paths using SVG `offset-path`, showing progress as a percentage of the voyage completed
- **Origin ports** pulse in neon blue, destination ports in pink
- **Status badges** (On Schedule / Delayed / Under Review) reflect real carrier operations
- **Pan and zoom** let operators drill into specific regions, with drag-to-pan and scroll-wheel zoom

**Who uses this**: Fleet operations managers, supply chain analysts, port agents.

### 2. Vessel Telemetry — At-a-Glance Stats

**Business problem**: When a carrier calls in, the operator needs speed, ETA, and route details without digging through AIS feeds.

Displays current speed (knots), estimated arrival time, and the origin→destination route with a progress bar. This is the condensed "bridge view" — the same data a ship's captain would see on the navigation display, presented for a shoreside audience.

**Who uses this**: Vessel traffic coordinators, chartering desks, port logistics.

### 3. Port Advisory — Weather Intelligence

**Business problem**: Weather is the #1 cause of port delays outside of mechanical failures. High winds close container cranes. Rough seas prevent pilot boarding. Thunderstorms halt cargo handling.

The advisory panel pulls live weather from the OpenWeather API (with mock fallback) for each destination port. It shows:
- **Temperature** — affects cargo (reefer containers, sensitive goods)
- **Wind speed and direction** — determines whether cranes can operate (typically >30 kn = port closure)
- **Alert conditions** — high winds vs. calm seas, dynamically evaluated

In a production system, this would feed into scheduling algorithms that flag at-risk arrivals 48 hours ahead.

**Who uses this**: Port captains, terminal operators, scheduling desks.

### 4. Customs Verification — Regulatory Clearance

**Business problem**: Every international shipment must clear customs. The clearance process requires verified country data — official jurisdiction name, currency codes, languages, population thresholds for duties.

This panel fetches country profiles from the REST Countries API and displays:
- National flag (visual confirmation)
- Official jurisdiction name
- Population (used for de minimis threshold calculations)
- Currency with symbol (drives the invoice currency display)
- Languages (relevant for documentation requirements)

The "Cargo manifests verified" badge signals regulatory compliance.

**Who uses this**: Customs brokers, compliance officers, freight forwarders.

### 5. Freight Calculator — Costing & Multi-Currency Settlement

**Business problem**: A freight invoice involves multiple cost layers — base freight, insurance, customs fees — and payment may settle in any of several currencies. The operator needs to quote, calculate, and present costs in real time.

The calculator models a real freight bill:

| Cost Component | How It's Calculated | Business Logic |
|---------------|-------------------|----------------|
| **Base freight** | TEUs × rate per container | Rate varies by route (high-demand transpacific = $4800/TEU, Asia-Europe = $3400/TEU) |
| **Insurance** | TEUs × $250/TEU (optional) | Marine risk insurance, typical at 1-3% of cargo value |
| **Customs fees** | TEUs × $180/TEU | Fixed regulatory processing fee per container |
| **Currency conversion** | USD → local currency, USDC, ETH, BTC | Live rates from CoinGecko, reflecting real crypto adoption in trade finance |

The multi-currency payment grid shows settlement options in:
- **Local currency** (e.g., EUR for Rotterdam, CNY for Shanghai)
- **USDC** — the stablecoin of choice for trade finance
- **Ethereum (ETH)** — used in smart contract-based letters of credit
- **Bitcoin (BTC)** — increasingly accepted for international wire alternatives

An "Issue freight invoice" button generates a confirmation modal with the final breakdown.

**Who uses this**: Freight rate managers, finance teams, trading desks, logistics procurement.

---

## Data Resilience — Production-Ready Fallbacks

In maritime operations, internet connectivity is unreliable — vessels at sea have limited bandwidth, shoreside APIs go down, and rate limits hit during market volatility. Every data source in this dashboard has a built-in mock fallback:

| API | Fallback | Coverage |
|-----|----------|----------|
| OpenWeather | `MOCK_WEATHER` | 8 major port cities |
| REST Countries | `MOCK_COUNTRIES` | 8 trading nations (CN, NL, SG, US, DE, KR, AE, JP) |
| CoinGecko | `MOCK_EXCHANGE_RATES` | BTC, ETH, USDC |

This means the dashboard is **fully functional offline** — useful for demos, disconnected operations, and rate-limited scenarios.

---

## The Routes — Real Trade Corridors

The 9 routes model real commercial shipping lanes:

| Route | Trade Corridor | Typical Vessel |
|-------|---------------|---------------|
| Asia-Europe Express (AEX) | Shanghai → Rotterdam | 24,000 TEU Neo-Panamax |
| Transpacific Eastbound (TPE) | Singapore → Los Angeles | 20,000 TEU Post-Panamax |
| Transatlantic Bridge (TAB) | Rotterdam → Los Angeles | 18,000 TEU |
| Korea-West Coast Express (KWX) | Busan → Los Angeles | 16,000 TEU |
| China-North Europe Link (CNL) | Shenzhen → Hamburg | 24,000 TEU |
| Middle East Gateway (MEG) | Jebel Ali → Singapore | 15,000 TEU |
| North Atlantic Corridor (NAC) | Rotterdam → New York | 14,000 TEU |
| Japan Transpacific (JTX) | Yokohama → Long Beach | 14,000 TEU |
| China Coastal Relay (CCR) | Ningbo → Singapore | 10,000 TEU Feeder |

---

## Technical Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **Framework** | Next.js 16.2.9 (App Router) | Server Components, API routes, Multi-Zones |
| **UI** | React 19 + motion | Component rendering, animations |
| **Styling** | Tailwind CSS v4 + CSS custom properties | Design system, theming |
| **Data fetching** | TanStack React Query | Caching, deduplication, retry, refetch |
| **HTTP** | Axios | API client with interceptors |
| **Map** | Custom SVG Mercator projection | Zero-dependency world map |
| **State** | React useState + React Query | Route selection, form state, server cache |
| **Monorepo** | pnpm workspaces + Turborepo | Package management, build orchestration |

See [TECH_DETAILS.md](./TECH_DETAILS.md) for the full architecture deep-dive on Multi-Zones proxying, Turborepo pipelines, and TypeScript resolution.

---

## Project Structure

```
apps/
├── main-portfolio/          # Personal portfolio site (host)
│   └── src/app/             # Single page with Hero, About, Projects, Contact, Architecture
│
└── project-dashboard/       # Maritime logistics dashboard (sub-app)
    └── src/
        ├── app/
        │   ├── dashboard/           # Dashboard page
        │   └── api/                 # Country & Ports API routes
        ├── components/
        │   ├── RouteMap.tsx         # SVG world map with routes
        │   ├── VesselTelemetry.tsx  # Speed, ETA, progress
        │   ├── PortAdvisory.tsx     # Weather at destination
        │   ├── CustomsVerification.tsx  # Country profiles
        │   ├── InvoicingPanel.tsx   # Freight cost calculator
        │   └── SuccessModal.tsx     # Invoice confirmation
        ├── hooks/                   # useWeather, useCountry, useExchangeRates
        ├── services/                # Axios client + API functions
        ├── lib/                     # Port data, map projection
        └── constants/               # Routes, mock data fallbacks

packages/
└── ui/                     # Shared design system (Button, Card, Header, FadeIn, 3D Blob, PDF viewer)
```

---

## Getting Started

```bash
pnpm install
pnpm dev        # Starts both apps (host on :3000, dashboard on :3001)
pnpm run build  # Production build with Turborepo caching
```

The dashboard is available at **`http://localhost:3000/dashboard`** — the host proxies all `/dashboard` requests to the sub-app.

Environment variables for external APIs (see `apps/project-dashboard/.env.local`):

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key
REST_COUNTRIES_API_KEY=your_key
```

---

## Related Documents

- [TECH_DETAILS.md](./TECH_DETAILS.md) — Multi-Zones proxying, Turborepo pipelines, TypeScript resolution, React 19 client boundaries
- [AGENTS.md](./AGENTS.md) — Monorepo conventions for developer agents
