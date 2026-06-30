"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Select } from "../controls/Select";
import { Slider } from "../controls/Slider";
import { FullSpecimenCard } from "../FullSpecimenCard";

const Blob = dynamic(() => import("@portfolio/ui/3d").then((mod) => mod.Blob), {
  ssr: false,
});

export function BlobPlayground() {
  const [variant, setVariant] = React.useState<"pink" | "neon">("pink");
  const [distort, setDistort] = React.useState(0.55);
  const [speed, setSpeed] = React.useState(3);

  const code = `<Blob${variant !== "pink" ? `\n  variant="${variant}"` : ""}${
    distort !== 0.55 ? `\n  distort={${distort}}` : ""
  }${speed !== 3 ? `\n  speed={${speed}}` : ""}
/>`;

  return (
    <FullSpecimenCard
      name="Blob"
      props={`variant="${variant}"`}
      code={code}
      controls={
        <>
          <Select label="Variant" value={variant} options={["pink", "neon"]} onChange={setVariant} />
          <Slider label="Distort" value={distort} min={0} max={1} step={0.05} onChange={setDistort} />
          <Slider label="Speed" value={speed} min={0.5} max={6} step={0.5} onChange={setSpeed} />
        </>
      }
    >
      <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden", borderRadius: "8px" }}>
        <Blob variant={variant} distort={distort} speed={speed} />
      </div>
    </FullSpecimenCard>
  );
}
