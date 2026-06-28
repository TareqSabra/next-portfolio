"use client";

import { motion } from "motion/react";

interface PortNodeProps {
  cx: number;
  cy: number;
  code: string;
  isSelected?: boolean;
  isOrigin?: boolean;
  isDestination?: boolean;
}

export function PortNode({ cx, cy, code, isSelected, isOrigin, isDestination }: PortNodeProps) {
  const isHighlighted = isOrigin || isDestination || isSelected;
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={isHighlighted ? 6 : 4}
        fill={isOrigin ? "var(--accent-pink-primary)" : isDestination ? "#22c55e" : "var(--text-muted)"}
        stroke={isSelected ? "var(--accent-pink-primary)" : "rgba(255,255,255,0.1)"}
        strokeWidth={isHighlighted ? 2 : 1}
        animate={{ r: isHighlighted ? 6 : 4 }}
        transition={{ duration: 0.3 }}
        style={{ cursor: "pointer" }}
      />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="7"
        fontFamily="var(--font-mono)"
        fontWeight={isHighlighted ? 600 : 400}
      >
        {code}
      </text>
    </g>
  );
}
