import * as React from "react";

interface ScrollIndicatorProps {
  href: string;
  label: string;
  direction?: "down" | "up";
}

export function ScrollIndicator({ href, label, direction = "down" }: ScrollIndicatorProps) {
  return (
    <a href={href} className="scroll-indicator">
      <span>{label}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={direction === "up" ? { transform: "rotate(180deg)" } : undefined}
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </a>
  );
}
