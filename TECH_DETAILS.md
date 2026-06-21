# Technical Specifications & Architecture Guide (TECH_DETAILS.md)

This document provides a deep dive into the technical details of the **Next.js Multi-Zones Microfrontend Monorepo** architecture used in this project.

---

## 1. Next.js Multi-Zones Under the Hood

**Multi-Zones** is a feature built into Next.js that allows you to run multiple independent Next.js applications on different servers or ports, while serving them to the user under a single, unified domain.

```
                  ┌──────────────────────────────┐
                  │      User's Browser          │
                  │   (e.g., localhost:3000)     │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   Host Application    │ (Main Portfolio)
                     │     (Port 3000)       │
                     └───────────┬───────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │ Route: /                      │ Route: /dashboard
                 ▼                               ▼
      ┌─────────────────────┐         ┌─────────────────────┐
      │   Serve Home Page   │         │ Next Config Rewrite │
      │   (Local Render)    │         │      (Proxy)        │
      └─────────────────────┘         └──────────┬──────────┘
                                                 │
                                                 ▼
                                      ┌─────────────────────┐
                                      │  Dashboard Sub-App  │ (Microfrontend)
                                      │     (Port 3001)     │
                                      └─────────────────────┘
```

### The Request Lifecycle
When a user navigates to `http://localhost:3000/dashboard`:

1.  **Incoming Request**: The request hits the Host Application (`apps/main-portfolio`) running on port `3000`.
2.  **Next.js Rewrite Engine**: The Host checks its `next.config.ts` rewrite rules:
    ```typescript
    {
      source: "/dashboard/:path*",
      destination: "http://localhost:3001/dashboard/:path*"
    }
    ```
3.  **Proxy Pass**: The Host acts as a reverse proxy. It makes an internal HTTP request to the Dashboard Sub-App (`http://localhost:3001/dashboard`) to fetch the requested page.
4.  **Streaming Response**: The Dashboard Sub-App executes its Server Components (RSC) and rendering engine, producing HTML and static payloads. It streams the response back to the Host.
5.  **Seamless Delivery**: The Host receives the HTML/RSC stream and sends it to the user. The browser's address bar remains on `http://localhost:3000/dashboard`.

### Asset and Chunk Resolution (Why `basePath` is critical)
When a Next.js app builds, it references internal JS bundles, CSS, and images under paths like `/_next/static/...`. 

Without a prefix, the browser would request `http://localhost:3000/_next/static/chunks/main.js` from the Host. However, that specific file only exists on the Sub-App's server.

*   **The Solution**: We configured `basePath: "/dashboard"` inside the Sub-App's config.
*   **Result**: The Sub-App prefixes all of its internal assets with its base route. The browser requests `http://localhost:3000/dashboard/_next/static/chunks/main.js`.
*   **Routing**: The Host's rewrite rule (`/dashboard/:path*`) captures this asset request and successfully forwards it to the Sub-App (`http://localhost:3001/dashboard/_next/static/chunks/...`).

---

## 2. Monorepo Dependency Resolution

We use **pnpm workspaces** to handle dependencies. Rather than downloading copies of packages for every application, pnpm maintains a global store and creates filesystem symlinks.

### Package Symlinking
In our workspace, we declare dependencies between packages using the `workspace:*` syntax:

```json
"dependencies": {
  "@portfolio/ui": "workspace:*"
}
```

*   **Pnpm Linking**: During `pnpm install`, pnpm detects that `@portfolio/ui` is a local package in `/packages/ui`.
*   **Symlinks**: It creates a symlink at `apps/main-portfolio/node_modules/@portfolio/ui` pointing directly to the `/packages/ui` directory.
*   **Instant Updates**: Because it is a filesystem symlink, any change you make to components in `packages/ui` is instantly visible to the apps during development without needing a rebuild or reinstallation step.

---

## 3. Turborepo Orchestration

**Turborepo** (`turbo`) builds a directed acyclic graph (DAG) of the tasks in your monorepo.

### Dependency Task Pipelines
In `turbo.json`, we configure task pipelines:
```json
"tasks": {
  "build": {
    "dependsOn": ["^build"],
    "outputs": [".next/**", "dist/**"]
  }
}
```

*   **`dependsOn: ["^build"]`**: The caret (`^`) symbol means "dependencies first". It tells turbo that before building a package, it must build all of its internal dependencies.
*   **Caching**: Turborepo hashes the files in your workspaces. If you run `pnpm run build` and haven't modified a package, turbo will skip compilation and pull the previous build output (e.g. `.next/` folder) from cache, resulting in sub-second build times.

---

## 4. TypeScript Path & JSX Resolution

TypeScript editors (like VS Code) require type declarations for JSX elements. When extending configurations across workspaces, node modules might not be linked yet during editor startup.

*   **The Problem**: Extending TSConfig via packages (e.g., `"extends": "@portfolio/tsconfig/react-library.json"`) requires TypeScript to perform node resolution, which can fail inside a shared package if dependencies are not fully initialized locally.
*   **The Solution**: We configure relative path extensions:
    ```json
    "extends": "../tsconfig/react-library.json"
    ```
    This directly maps the configuration via the filesystem, resolving JSX types (`"jsx": "react-jsx"`) instantly without depending on active symlinks.

---

## 5. React 19 & Client Component Boundaries (Motion)

We use the React 19 compatible version of Framer Motion (rebranded simply as **`motion`**):

1.  **Import Target**: We import from `"motion/react"` instead of `"framer-motion"`.
2.  **Client-Side Animations**: Because animations depend on browser-only requestAnimationFrame and hooks (like `useAnimate`), motion components must run client-side.
3.  **Boundary Rules**: We declare `"use client"` at the top of components (like `Card.tsx`) using motion. This creates a hydration boundary in Next.js. The outer layout is rendered statically on the server, while the card itself mounts and hooks into client-side animations once loaded in the browser.
