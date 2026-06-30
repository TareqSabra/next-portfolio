"use client";

import * as React from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TextInput } from "../controls/TextInput";
import { Select } from "../controls/Select";
import { SpecimenCard } from "../SpecimenCard";
import type { Node, Edge } from "@xyflow/react";

const initialNodes: Node[] = [
  { id: "1", type: "input", position: { x: 0, y: 0 }, data: { label: "Input" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Process" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "Validate" } },
  { id: "4", type: "output", position: { x: 0, y: 300 }, data: { label: "Output" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

let nodeCounter = 4;

export function FlowPlayground() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [label, setLabel] = React.useState("");
  const [nodeType, setNodeType] = React.useState<"input" | "default" | "output">("default");

  const addNode = () => {
    nodeCounter++;
    const id = String(nodeCounter);
    const y = nodes.length > 0 ? nodes[nodes.length - 1].position.y + 100 : 0;
    const newNode: Node = {
      id,
      type: nodeType === "default" ? undefined : nodeType,
      position: { x: 0, y },
      data: { label: label.trim() || `Node ${id}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setLabel("");
  };

  const removeNode = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
  };

  const code = `import { ReactFlow, ReactFlowProvider, Background, Controls } from "@xyflow/react";

const nodes = [
${nodes.map((n) => `  { id: "${n.id}",${n.type ? ` type: "${n.type}",` : ""} position: { x: 0, y: ${n.position.y} }, data: { label: "${n.data.label}" } },`).join("\n")}
];

const edges = [
${edges.map((e) => `  { id: "${e.id}", source: "${e.source}", target: "${e.target}" },`).join("\n")}
];

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
}`;

  return (
    <SpecimenCard
      name="Flow"
      props={`${nodes.length} nodes`}
      code={code}
      controls={
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>
              Add Node
            </p>
            <TextInput label="Label" value={label} onChange={setLabel} />
            <div style={{ marginTop: "6px" }}>
              <Select label="Type" value={nodeType} options={["input", "default", "output"]} onChange={setNodeType} />
            </div>
            <button
              onClick={addNode}
              style={{
                marginTop: "8px",
                width: "100%",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-primary)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              + Add Node
            </button>
          </div>

          <div>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px" }}>
              Nodes ({nodes.length})
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "200px", overflowY: "auto" }}>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.03)",
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {node.data.label as string}
                  </span>
                  <button
                    onClick={() => removeNode(node.id)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      padding: "2px 4px",
                      fontSize: "0.7rem",
                      borderRadius: "3px",
                      lineHeight: 1,
                      transition: "color 0.15s ease",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-pink-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flow-pg" style={{ width: "100%", height: "380px", position: "relative", alignSelf: "stretch" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            style={{ background: "transparent" }}
          >
            <Background color="rgba(255,255,255,0.04)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <style>{`
        .flow-pg .react-flow__node {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--text-primary, #e8e6e3);
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(20,20,24,0.85);
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          min-width: 100px;
          text-align: center;
        }
        .flow-pg .react-flow__node-input {
          border-color: rgba(0,242,254,0.3);
          background: rgba(0,242,254,0.08);
        }
        .flow-pg .react-flow__node-output {
          border-color: rgba(226,155,159,0.3);
          background: rgba(226,155,159,0.08);
        }
        .flow-pg .react-flow__node.selected {
          border-color: var(--accent-pink-primary, #e29b9f);
          box-shadow: 0 0 0 1px var(--accent-pink-primary, #e29b9f), 0 2px 12px rgba(226,155,159,0.2);
        }
        .flow-pg .react-flow__node-input.selected {
          border-color: var(--accent-neon-blue, #00f2fe);
          box-shadow: 0 0 0 1px var(--accent-neon-blue, #00f2fe), 0 2px 12px rgba(0,242,254,0.2);
        }
        .flow-pg .react-flow__node-output.selected {
          border-color: var(--accent-pink-primary, #e29b9f);
          box-shadow: 0 0 0 1px var(--accent-pink-primary, #e29b9f), 0 2px 12px rgba(226,155,159,0.2);
        }
        .flow-pg .react-flow__node:hover {
          border-color: rgba(255,255,255,0.15);
        }
        .flow-pg .react-flow__edge-path {
          stroke: var(--accent-pink-primary, #e29b9f);
          stroke-width: 2;
          opacity: 0.4;
        }
        .flow-pg .react-flow__edge.selected .react-flow__edge-path { opacity: 1; }
        .flow-pg .react-flow__edge:hover .react-flow__edge-path { opacity: 0.8; }
        .flow-pg .react-flow__handle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(20,20,24,0.85);
          transition: background 0.15s ease;
        }
        .flow-pg .react-flow__handle:hover { background: var(--accent-pink-primary, #e29b9f); }
        .flow-pg .react-flow__controls {
          gap: 2px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }
        .flow-pg .react-flow__controls-button {
          width: 28px;
          height: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(20,20,22,0.9);
          fill: var(--text-secondary, #a0a0a0);
          color: var(--text-secondary, #a0a0a0);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .flow-pg .react-flow__controls-button:hover {
          background: rgba(40,40,44,0.95);
          fill: var(--text-primary, #e8e6e3);
          color: var(--text-primary, #e8e6e3);
        }
        .flow-pg .react-flow__controls-button svg { width: 14px; height: 14px; }
        .flow-pg .react-flow__controls-button:last-child { border-bottom: none; }
      `}</style>
    </SpecimenCard>
  );
}
