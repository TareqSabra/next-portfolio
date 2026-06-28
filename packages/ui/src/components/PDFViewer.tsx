import { useMemo } from "react";
import { createPluginRegistration } from "@embedpdf/core";
import { EmbedPDF } from "@embedpdf/core/react";
import { usePdfiumEngine } from "@embedpdf/engines/react";

// Import the essential plugins
import {
  Viewport,
  ViewportPluginPackage,
} from "@embedpdf/plugin-viewport/react";
import { Scroller, ScrollPluginPackage } from "@embedpdf/plugin-scroll/react";
import {
  DocumentContent,
  DocumentManagerPluginPackage,
} from "@embedpdf/plugin-document-manager/react";
import {
  RenderLayer,
  RenderPluginPackage,
} from "@embedpdf/plugin-render/react";

// 1. Register the plugins you need

export const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const { engine, isLoading } = usePdfiumEngine();
  const plugins = useMemo(
    () => [
      createPluginRegistration(DocumentManagerPluginPackage, {
        initialDocuments: [{ url: pdfUrl }],
      }),
      createPluginRegistration(ViewportPluginPackage),
      createPluginRegistration(ScrollPluginPackage),
      createPluginRegistration(RenderPluginPackage),
    ],
    [pdfUrl],
  );

  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }

  return (
    <div style={{ height: "500px" }}>
      <EmbedPDF engine={engine} plugins={plugins}>
        {({ activeDocumentId }) =>
          activeDocumentId && (
            <DocumentContent documentId={activeDocumentId}>
              {({ isLoaded }) =>
                isLoaded && (
                  <Viewport
                    documentId={activeDocumentId}
                    style={{
                      backgroundColor: "transparent",
                    }}
                    className="pdf-no-scrollbar"
                  >
                    <Scroller
                      documentId={activeDocumentId}
                      className="pdf-no-scrollbar"
                      renderPage={({ width, height, pageIndex }) => (
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: `${width}px`,
                            aspectRatio: `${width} / ${height}`,
                            margin: "0 auto",
                            padding: "var(--spacing-xs)",
                          }}
                        >
                          {/* The RenderLayer is responsible for drawing the page */}
                          <RenderLayer
                            documentId={activeDocumentId}
                            pageIndex={pageIndex}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "var(--radius-sm)",
                              boxShadow: "var(--shadow-lg)",
                            }}
                          />
                        </div>
                      )}
                    />
                  </Viewport>
                )
              }
            </DocumentContent>
          )
        }
      </EmbedPDF>
    </div>
  );
};
