"use client";

import * as React from "react";
import { FadeIn } from "@portfolio/ui";
import { Select } from "../controls/Select";
import { Slider } from "../controls/Slider";
import { SpecimenCard } from "../SpecimenCard";

export function FadeInPlayground() {
  const [direction, setDirection] = React.useState<"up" | "down" | "left" | "right" | "none">("up");
  const [delay, setDelay] = React.useState(0);
  const [duration, setDuration] = React.useState(0.5);

  const code = `<FadeIn direction="${direction}" delay={${delay}} duration={${duration}}>
  <div>Animated Content</div>
</FadeIn>`;

  return (
    <SpecimenCard
      name="FadeIn"
      props={`${direction} · ${duration}s`}
      code={code}
      controls={
        <>
          <Select label="Direction" value={direction} options={["up", "down", "left", "right", "none"]} onChange={setDirection} />
          <Slider label="Delay" value={delay} min={0} max={2} step={0.1} onChange={setDelay} />
          <Slider label="Duration" value={duration} min={0.1} max={2} step={0.1} onChange={setDuration} />
        </>
      }
    >
      <FadeIn direction={direction} delay={delay} duration={duration}>
        <div
          style={{
            padding: "16px 28px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, var(--accent-pink-primary), var(--accent-pink-secondary))",
            color: "#000",
            fontWeight: 600,
            fontSize: "0.95rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.3px",
          }}
        >
          Animated Content
        </div>
      </FadeIn>
    </SpecimenCard>
  );
}
