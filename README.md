# Tareq Sabra — Full Stack Engineer Portfolio Monorepo

Welcome to the repository of my developer portfolio and microfrontend showcase. This project is built as a **Next.js Microfrontend Monorepo** leveraging modern web standards, modular UI packaging, and Turborepo orchestration.

---

## 🙋‍♂️ About Me

I am a **Full Stack Engineer** with **5+ years of experience** building and delivering production-grade web applications. My expertise is centered around **React, TypeScript, and Python**, with a deep passion for modern frontend architecture, AI-driven applications (RAG pipelines, LLM streaming), and highly optimized real-time systems.

I blend strong software engineering fundamentals with modern, fast-paced workflows to deliver scalable, reliable, and user-centric interfaces.

### 📬 Contact & Socials
*   **Email**: [tareqjammal98@gmail.com](mailto:tareqjammal98@gmail.com)
*   **Phone**: +970597343672
*   **LinkedIn**: [linkedin.com/in/tareq-sabra](https://linkedin.com/in/tareq-sabra)
*   **Location**: Palestine
*   **Education**: B.S. in Computer Engineering, An-Najah National University (ABET-certified)

---

## 🛠️ Tech Stack & Expertise

| Area | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3, Responsive Design, Micro-Frontends |
| **State Management** | Zustand, Jotai, Redux, React Context |
| **Backend & APIs** | Python, FastAPI, Node.js, Express, REST APIs, WebSockets |
| **Database & ORM** | PostgreSQL, Supabase, SQLAlchemy, Alembic |
| **AI & Real-Time** | LLM Integration, RAG (Retrieval-Augmented Generation) Workflows, JSON/Text Streaming Responses, WebSockets |
| **Testing & CI/CD** | GitLab CI/CD, Unit Testing, ESLint, Prettier |
| **Build & Orchestration** | pnpm workspaces, Turborepo, Next.js Multi-Zones |
| **Aesthetics & Animations** | `motion/react` (React 19 compatible Framer Motion), Three.js, React Three Fiber (R3F), Drei, Glassmorphism, CSS Custom Properties |

---

## 💼 Professional Experience

### **Front-End Engineer** @ **AUI (Augmented Intelligence)**  
*05/2024 – Present*
*   **AI Integrations**: Designed and delivered AI-powered product features, integrating Large Language Model (LLM) capabilities including Retrieval-Augmented Generation (RAG) workflows and real-time conversational experiences.
*   **Real-time Streaming**: Built responsive, real-time streaming interfaces using WebSockets for dynamic, instant UI updates.
*   **Performance Engineering**: Refactored existing UI components using modern best practices, resulting in a **20% performance uplift** and **15% improvement** in Web Vitals metrics.
*   **State & Code Architecture**: Optimized state management using Zustand and Jotai to enhance responsiveness, and architected modular component systems to support dynamic, AI-generated content.
*   **AI-Assisted Workflows**: Leveraged AI-enabled development tools to accelerate delivery cycles while maintaining high code quality and test coverage.

### **Fullstack Engineer (Front-End Focus)** @ **Asal Technologies / Ride with Via**  
*10/2021 – 05/2024*
*   **Micro-Frontends**: Engineered scalable applications under a distributed Next.js Micro-Frontend architecture.
*   **Shared Design Systems**: Created and maintained reusable React component libraries and UI modules shared across multiple product verticals.
*   **Python Backend**: Developed and optimized backend APIs and microservices using Python, FastAPI, SQLAlchemy, and Alembic.
*   **Databases**: Participated in API design, backend third-party integrations, and database migrations.
*   **DevOps & CI/CD**: Authored GitLab CI/CD pipelines for automated testing, linting, and formatting to guarantee continuous code stability.

---

## 🏗️ Repository Architecture

This repository is structured as a **Turborepo** monorepo using **pnpm workspaces** to orchestrate independent microfrontends and shared libraries.

```
next-portfolio/
├── apps/
│   ├── main-portfolio/       # [Port 3000] Host Shell application (Hero, About, Contact, Architecture)
│   ├── project-dashboard/    # [Port 3001] Maritime Logistics analytics dashboard (Microfrontend sub-app)
│   └── design-system/        # [Port 3002] Shared Design tokens and component showcase app
│
├── packages/
│   ├── ui/                   # Shared UI kit (Components, 3D Canvas, CSS variables, PDF viewer)
│   └── tsconfig/             # Shared TypeScript compilation configurations
│
├── pnpm-workspace.yaml       # Workspace boundary mapping
├── turbo.json                # Turborepo task pipeline configurations
├── TECH_DETAILS.md           # In-depth architectural guide (Routing, Symlinking, Next Multi-Zones)
└── AGENTS.md                 # Development constraints and best practices
```

---

## ⚡ Next.js Multi-Zones Integration (Microfrontend Proxying)

Instead of using Module Federation, this project utilizes **Next.js Multi-Zones** (proxy-level routing) to merge multiple independent applications under a single origin (`localhost:3000`).

*   **The Shell Host (`apps/main-portfolio` on `:3000`)** handles core landing routes (`/`, `/about`, etc.) and acts as a reverse proxy for specific paths.
*   **The Project Dashboard (`apps/project-dashboard` on `:3001`)** owns the `/dashboard` route. It sets `basePath: "/dashboard"` inside `next.config.ts`.
*   **The Design System (`apps/design-system` on `:3002`)** owns the `/design-system` route. It sets `basePath: "/design-system"` inside `next.config.ts`.

### Rewrite Proxy Rules
When the host receives requests for `/dashboard` or `/design-system`, it proxies them downstream via internal rewrites configured in `apps/main-portfolio/next.config.ts`:

```typescript
// apps/main-portfolio/next.config.ts
async rewrites() {
  return [
    {
      source: "/dashboard",
      destination: "http://localhost:3001/dashboard",
    },
    {
      source: "/dashboard/:path*",
      destination: "http://localhost:3001/dashboard/:path*",
    },
    {
      source: "/design-system",
      destination: "http://localhost:3002/design-system",
    },
    {
      source: "/design-system/:path*",
      destination: "http://localhost:3002/design-system/:path*",
    },
  ];
}
```

This configuration allows individual teams to build, deploy, and maintain sub-applications independently, while the user experiences a cohesive, single-page application.

---

## 📦 Package Dependency Resolution

*   **Pnpm Linking**: Shared packages (like `@portfolio/ui`) are declared in application `package.json` files as `"@portfolio/ui": "workspace:*"`. pnpm sets up symlinks pointing directly to `packages/ui`, enabling instant hot-reloading when modifying components.
*   **Turborepo Build Pipeline**: Tasks in `turbo.json` enforce topological build order (e.g., builds packages first before building applications) and use content hashing to cache build artifacts.

---

## 🚀 Getting Started

To spin up the entire monorepo locally, follow these steps:

### Prerequisites
Make sure you have Node.js and **pnpm** globally installed:
```bash
corepack enable pnpm
```

### Installation & Development
1.  **Clone the repository**
2.  **Install dependencies** at the root:
    ```bash
    pnpm install
    ```
3.  **Start all microfrontend servers** simultaneously:
    ```bash
    pnpm dev
    ```

Once running, you can access the projects under the single Host port:
*   **Host Site**: `http://localhost:3000`
*   **Analytics Dashboard Sub-App**: `http://localhost:3000/dashboard` (proxied from port `3001`)
*   **Interactive Design System**: `http://localhost:3000/design-system` (proxied from port `3002`)

### Production Builds
Build all applications for production (with caching optimization):
```bash
pnpm run build
```

---

## 📑 Additional Documentation

*   [TECH_DETAILS.md](./TECH_DETAILS.md) — Dive deeper into Multi-Zones request lifecycles, chunk prefix resolution, and symlinking.
*   [AGENTS.md](./AGENTS.md) — Coding conventions, strict monorepo rules, and workspace configurations for developers and AI agents.
