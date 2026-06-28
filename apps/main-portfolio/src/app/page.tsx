import fs from "fs/promises";
import path from "path";
import { codeToHtml } from "shiki";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ArchitectureSection from "../components/sections/ArchitectureSection";
import ContactSection from "../components/sections/ContactSection";
import { filesToLoad } from "../constants/architecture-files";

async function getHighlightedFile(
  relPath: string,
  lang: string,
  name: string,
  type: "code" | "config" | "style",
  explanation: string,
  takeaways: string[],
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

  const results = await Promise.all(
    fileKeys.map((key) => {
      const fileDef = filesToLoad[key];
      return getHighlightedFile(
        fileDef.relPath,
        fileDef.lang,
        fileDef.name,
        fileDef.type,
        fileDef.explanation,
        fileDef.takeaways,
      );
    }),
  );

  const loadedFiles: Record<string, any> = {};
  fileKeys.forEach((key, i) => {
    loadedFiles[key] = results[i];
  });

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
