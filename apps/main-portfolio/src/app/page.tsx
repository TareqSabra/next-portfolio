import fs from "fs/promises";
import path from "path";
import { codeToHtml } from "shiki";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ArchitectureSection from "../components/sections/ArchitectureSection";
import ContactSection from "../components/sections/ContactSection";

const filesToLoad = {
  "pnpm-workspace.yaml": {
    relPath: "pnpm-workspace.yaml",
    lang: "yaml",
    name: "pnpm-workspace.yaml",
    type: "config" as const,
    explanation: "Defines the monorepo workspace directories. It instructs pnpm to link package dependencies across local folders globally instead of using npm registries.",
    takeaways: [
      "Links local apps/ and packages/ together.",
      "Ensures zero duplicate installs across the repo.",
      "Enables local package symlinking using workspace:* references."
    ],
  },
  "turbo.json": {
    relPath: "turbo.json",
    lang: "json",
    name: "turbo.json",
    type: "config" as const,
    explanation: "Configures the Turborepo pipeline, coordinating builds, tests, and linting tasks efficiently with localized, incremental compilation caching.",
    takeaways: [
      "Caches build artifacts globally or locally.",
      "Speeds up compile times by only compiling what changed.",
      "Maps task dependency chains (e.g., compile shared UI before building apps)."
    ],
  },
  "main-portfolio/next.config.ts": {
    relPath: "apps/main-portfolio/next.config.ts",
    lang: "typescript",
    name: "next.config.ts (Host App)",
    type: "code" as const,
    explanation: "The Next.js configuration for the host (shell) app. Configures proxy-level rewrites mapping path routes dynamically to route traffic to the sub-app.",
    takeaways: [
      "Configures Next.js Multi-Zones microfrontend routing.",
      "Rewrites requests targeting /dashboard directly to localhost:3001.",
      "Declares transpilePackages to enable instant HMR across the UI library."
    ],
  },
  "project-dashboard/next.config.ts": {
    relPath: "apps/project-dashboard/next.config.ts",
    lang: "typescript",
    name: "next.config.ts (Sub App)",
    type: "code" as const,
    explanation: "Configuration for the project-dashboard microfrontend. Sets the basePath to align routing and prevent file collision with the host.",
    takeaways: [
      "Establishes basePath: '/dashboard' so all routes align under the sub-path.",
      "Prevents root assets and scripts from colliding with host resources.",
      "Ensures the router serves Next.js endpoints on port 3001."
    ],
  },
  "ui/src/components/3D/blob.tsx": {
    relPath: "packages/ui/src/components/3D/blob.tsx",
    lang: "tsx",
    name: "blob.tsx (Shared 3D Canvas)",
    type: "code" as const,
    explanation: "Uses React Three Fiber (R3F) and Drei to render the morphing, organic 3D gradient blob. Scaled and positioned in 3D scene coordinate space.",
    takeaways: [
      "Imports WebGL components client-side.",
      "Combines Sphere and MeshDistortMaterial for organic 3D morphing shapes.",
      "Applies GradientTexture directly to material to display button colors."
    ],
  },
  "ui/src/styles/tokens.css": {
    relPath: "packages/ui/src/styles/tokens.css",
    lang: "css",
    name: "tokens.css (Design System)",
    type: "style" as const,
    explanation: "Stores core CSS custom variables and styling tokens (neon colors, glass backgrounds, Outfit / Space Grotesk typography) shared across the workspace.",
    takeaways: [
      "Centralizes responsive colors and core layout themes.",
      "Contains variables for modern glassmorphism backdrops.",
      "Ensures design styling consistency across all microfrontends."
    ],
  }
};

async function getHighlightedFile(
  relPath: string,
  lang: string,
  name: string,
  type: "code" | "config" | "style",
  explanation: string,
  takeaways: string[]
) {
  try {
    const fullPath = path.join(process.cwd(), "../../", relPath);
    const content = await fs.readFile(fullPath, "utf-8");
    const highlightedHtml = await codeToHtml(content, {
      lang,
      theme: "github-dark",
    });
    return {
      name,
      path: relPath,
      type,
      explanation,
      takeaways,
      highlightedHtml,
    };
  } catch (error) {
    console.error(`Failed to load/highlight file ${relPath}:`, error);
    return {
      name,
      path: relPath,
      type,
      explanation,
      takeaways,
      highlightedHtml: `<pre><code>Failed to load file: ${relPath}</code></pre>`,
    };
  }
}

export default async function Home() {
  const fileKeys = Object.keys(filesToLoad) as Array<keyof typeof filesToLoad>;
  const loadedFiles: Record<string, any> = {};

  for (const key of fileKeys) {
    const fileDef = filesToLoad[key];
    loadedFiles[key] = await getHighlightedFile(
      fileDef.relPath,
      fileDef.lang,
      fileDef.name,
      fileDef.type,
      fileDef.explanation,
      fileDef.takeaways
    );
  }

  return (
    <div className="snap-container">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <ArchitectureSection files={loadedFiles} />
    </div>
  );
}
