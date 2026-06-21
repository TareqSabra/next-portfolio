"use client";

import * as React from "react";
import { FadeIn } from "@portfolio/ui";

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
      style={{
        background:
          "radial-gradient(circle at 90% 20%, rgba(79, 172, 254, 0.04) 0%, transparent 40%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", zIndex: 10 }}>
        <FadeIn direction="up">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              color: "var(--text-primary)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            How I Engineered My Portfolio Website
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "32px",
              maxWidth: "600px",
              fontSize: "1rem",
            }}
          >
            Explore the actual, live source code files of this Next.js
            Multi-Zone microfrontend monorepo
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="explorer-layout">
            <div className="explorer-sidebar">
              <div className="explorer-sidebar-header">WORKSPACE EXPLORER</div>
              <div className="explorer-tree">
                <div className="explorer-item folder">📁 next-portfolio</div>
                <div style={{ paddingLeft: "16px" }}>
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
                  <div style={{ paddingLeft: "16px" }}>
                    <div className="explorer-item folder">
                      📁 main-portfolio
                    </div>
                    <div style={{ paddingLeft: "16px" }}>
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
                    <div style={{ paddingLeft: "16px" }}>
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

                  <div className="explorer-item folder">📁 packages</div>
                  <div style={{ paddingLeft: "16px" }}>
                    <div className="explorer-item folder">📁 ui</div>
                    <div style={{ paddingLeft: "16px" }}>
                      <div className="explorer-item folder">📁 3D</div>
                      <div style={{ paddingLeft: "16px" }}>
                        {files["ui/src/components/3D/blob.tsx"] && (
                          <div
                            className={`explorer-item ${activeFileKey === "ui/src/components/3D/blob.tsx" ? "active" : ""}`}
                            onClick={() =>
                              setActiveFileKey("ui/src/components/3D/blob.tsx")
                            }
                          >
                            📄 blob.tsx
                          </div>
                        )}
                      </div>
                      <div className="explorer-item folder">📁 styles</div>
                      <div style={{ paddingLeft: "16px" }}>
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
                      margin: "8px 0",
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

      {/* Back to top */}
      <a href="#hero" className="scroll-indicator">
        <span>Back to top</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "rotate(180deg)" }}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </a>
    </section>
  );
}
