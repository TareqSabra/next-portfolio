# Developer & AI Agent Guide (AGENTS.md)

Welcome! This repository is a developer portfolio built as a **Next.js Microfrontend Monorepo** using **pnpm workspaces** and **Turborepo**.

If you are an AI coding agent or developer working on this codebase, please read and follow these rules to ensure the codebase remains clean, consistent, and builds correctly.

---

## 1. Project Architecture & Ports

This monorepo splits code into applications (`apps/`) and shared modules (`packages/`):

*   **`apps/main-portfolio`** (Port `3000`): The host (shell) website. It serves `/` and proxies `/dashboard` routes to the sub-app.
*   **`apps/project-dashboard`** (Port `3001`): A microfrontend sub-app serving routes under `/dashboard`.
*   **`packages/ui`**: Shared design tokens, CSS components, and React layout elements.
*   **`packages/tsconfig`**: Shared TypeScript compiler base profiles.

---

## 2. Next.js Multi-Zones (Microfrontend Routing)

We use Next.js Multi-Zones (proxy-level routing) rather than Module Federation. The applications run on different ports, and the host proxies requests:

1.  **Proxying Configuration**:
    In `apps/main-portfolio/next.config.ts`, all requests targeting `/dashboard` or `/dashboard/:path*` are rewritten to `http://localhost:3001/dashboard`.
2.  **Sub-App Prefixing**:
    `apps/project-dashboard/next.config.ts` must declare `basePath: "/dashboard"` to prevent route collisions and ensure assets load correctly.
3.  **Port Management**:
    The sub-app dev command in `apps/project-dashboard/package.json` must be set to `next dev -p 3001`. If adding a new sub-app, increment the port (e.g. `3002`) and add matching rewrites to the host next config.

---

## 3. Strict Monorepo Rules for Agents

Please adhere to the following rules when creating files or installing packages:

### Rule 1: No Nested Lockfiles or Workspace Configs
*   **Never** create local `pnpm-lock.yaml` or `pnpm-workspace.yaml` files inside `apps/` or `packages/` folders. 
*   Always let pnpm resolve package linking and workspaces globally using the root configuration files. 

### Rule 2: Shared Component Design First
*   Do not copy-paste common UI layout files (buttons, headers, inputs, card frames) between different apps.
*   Instead, build the UI components in `packages/ui/src/components/`, export them in `packages/ui/index.tsx`, and import them in the apps using `"@portfolio/ui": "workspace:*"`.
*   **Motion Animations**: We use the React 19 compatible `motion` library for animations.
    *   Always import motion utilities from `"motion/react"` (do NOT use the old `"framer-motion"` import).
    *   Any component using `motion` must declare `"use client"` at the very top of the file so Next.js treats it as a Client Component.

### Rule 3: Direct Relative TypeScript Configuration Extends
*   When configuring `tsconfig.json` files inside shared packages (e.g., `packages/ui/tsconfig.json`), extend shared configs using **relative paths** (e.g., `"extends": "../tsconfig/react-library.json"`) rather than module names. 
*   This prevents VS Code/editors from losing type bindings for JSX elements when workspaces are loaded.

### Rule 4: Handle Hydration Mismatches
*   Modern browser extensions (password managers, dark readers, translation tools) inject DOM attributes client-side which can trigger React hydration warnings.
*   Always add `suppressHydrationWarning` to the `<html>` tags in layout entrypoints of both host and sub-applications:
    ```tsx
    <html lang="en" suppressHydrationWarning>
    ```

---

## 4. Useful Commands

Run all scripts from the **workspace root** directory:

*   **Start all dev servers**:
    ```bash
    pnpm dev
    ```
*   **Compile and Typecheck all applications**:
    ```bash
    pnpm run build
    ```
*   **Install package to a specific app workspace**:
    ```bash
    pnpm --filter main-portfolio add [package-name]
    ```
