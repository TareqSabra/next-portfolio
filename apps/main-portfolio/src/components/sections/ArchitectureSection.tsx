"use client";

import * as React from "react";
import { FadeIn, ScrollIndicator } from "@portfolio/ui";

interface HighlightedFile {
  name: string;
  path: string;
  type: "code" | "config" | "style";
  explanation: string;
  takeaways: string[];
  highlightedHtml: string;
}

interface ArchitectureSectionProps {
  files: Record<string, HighlightedFile>;
}

export default function ArchitectureSection({
  files,
}: ArchitectureSectionProps) {
  const [activeFileKey, setActiveFileKey] = React.useState<string>(
    "main-portfolio/next.config.ts",
  );
  const activeFile = files[activeFileKey] || Object.values(files)[0];

  if (!activeFile) {
    return null;
  }

  return (
    <section
      id="architecture"
      className="snap-section"
      style={{}}
    >
      <div style={{ width: "100%", maxWidth: "75rem", zIndex: 10 }}>
        <FadeIn direction="up">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              color: "var(--text-primary)",
              fontWeight: 700,
              letterSpacing: "-0.03125rem",
              marginBottom: "0.5rem",
            }}
          >
            How I Engineered My Portfolio Website
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              maxWidth: "37.5rem",
              fontSize: "1rem",
            }}
          >
            A look under the hood of my portfolio website
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="explorer-layout">
            <div className="explorer-sidebar">
              <div className="explorer-sidebar-header">WORKSPACE EXPLORER</div>
              <div className="explorer-tree">
                <div className="explorer-item folder">📁 next-portfolio</div>
                <div style={{ paddingLeft: "1rem" }}>
                  {files["pnpm-workspace.yaml"] && (
                    <div
                      className={`explorer-item ${activeFileKey === "pnpm-workspace.yaml" ? "active" : ""}`}
                      onClick={() => setActiveFileKey("pnpm-workspace.yaml")}
                    >
                      ⚙️ pnpm-workspace.yaml
                    </div>
                  )}
                  {files["turbo.json"] && (
                    <div
                      className={`explorer-item ${activeFileKey === "turbo.json" ? "active" : ""}`}
                      onClick={() => setActiveFileKey("turbo.json")}
                    >
                      ⚙️ turbo.json
                    </div>
                  )}

                  <div className="explorer-item folder">📁 apps</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <div className="explorer-item folder">
                      📁 main-portfolio
                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                      {files["main-portfolio/next.config.ts"] && (
                        <div
                          className={`explorer-item ${activeFileKey === "main-portfolio/next.config.ts" ? "active" : ""}`}
                          onClick={() =>
                            setActiveFileKey("main-portfolio/next.config.ts")
                          }
                        >
                          📄 next.config.ts
                        </div>
                      )}
                    </div>

                    <div className="explorer-item folder">
                      📁 project-dashboard
                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                      {files["project-dashboard/next.config.ts"] && (
                        <div
                          className={`explorer-item ${activeFileKey === "project-dashboard/next.config.ts" ? "active" : ""}`}
                          onClick={() =>
                            setActiveFileKey("project-dashboard/next.config.ts")
                          }
                        >
                          📄 next.config.ts
                        </div>
                      )}
                    </div>
                  </div>

                  {files["package.json"] && (
                    <div
                      className={`explorer-item ${activeFileKey === "package.json" ? "active" : ""}`}
                      onClick={() => setActiveFileKey("package.json")}
                    >
                      📦 package.json
                    </div>
                  )}

                  <div className="explorer-item folder">📁 packages</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <div className="explorer-item folder">📁 ui</div>
                    <div style={{ paddingLeft: "1rem" }}>
                      <div className="explorer-item folder">📁 3D</div>
                      <div style={{ paddingLeft: "1rem" }}>
                        {files["ui/src/components/3d/blob.tsx"] && (
                          <div
                            className={`explorer-item ${activeFileKey === "ui/src/components/3d/blob.tsx" ? "active" : ""}`}
                            onClick={() =>
                              setActiveFileKey("ui/src/components/3d/blob.tsx")
                            }
                          >
                            📄 blob.tsx
                          </div>
                        )}
                      </div>
                      <div className="explorer-item folder">📁 styles</div>
                      <div style={{ paddingLeft: "1rem" }}>
                        {files["ui/src/styles/tokens.css"] && (
                          <div
                            className={`explorer-item ${activeFileKey === "ui/src/styles/tokens.css" ? "active" : ""}`}
                            onClick={() =>
                              setActiveFileKey("ui/src/styles/tokens.css")
                            }
                          >
                            🎨 tokens.css
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor & Explanation */}
            <div className="explorer-editor">
              <div className="explorer-editor-tabs">
                <div className="explorer-tab-item">
                  <span>{activeFile.type === "style" ? "🎨" : "📄"}</span>
                  <span>{activeFile.name}</span>
                </div>
              </div>

              <div className="explorer-editor-content">
                {/* Code Pane */}
                <div className="explorer-code-pane">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: activeFile.highlightedHtml,
                    }}
                  />
                </div>

                {/* Explanation Pane */}
                <div className="explorer-explain-pane">
                  <div className="explorer-explain-title">How It Works</div>
                  <div className="explorer-explain-text">
                    {activeFile.explanation}
                  </div>

                  <div
                    style={{
                      height: "1px",
                      background: "var(--border-muted)",
                      margin: "0.5rem 0",
                    }}
                  />

                  <div className="explorer-explain-title">
                    Key Architectural Points
                  </div>
                  <ul className="explorer-takeaway-list">
                    {activeFile.takeaways.map((point, index) => (
                      <li key={index} className="explorer-takeaway-item">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <ScrollIndicator href="#hero" label="Back to top" direction="up" />
    </section>
  );
}
