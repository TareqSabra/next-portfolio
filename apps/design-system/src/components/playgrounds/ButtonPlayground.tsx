"use client";

import * as React from "react";
import { Button } from "@portfolio/ui";
import { Select } from "../controls/Select";
import { Toggle } from "../controls/Toggle";
import { TextInput } from "../controls/TextInput";
import { SpecimenCard } from "../SpecimenCard";

export function ButtonPlayground() {
  const [variant, setVariant] = React.useState<"primary" | "secondary">("primary");
  const [disabled, setDisabled] = React.useState(false);
  const [text, setText] = React.useState("Click Me");

  const code = `<Button variant="${variant}"${disabled ? "\n  disabled" : ""}>
  ${text || "Click Me"}
</Button>`;

  return (
    <SpecimenCard
      name="Button"
      props={`variant="${variant}"`}
      code={code}
      controls={
        <>
          <Select label="Variant" value={variant} options={["primary", "secondary"]} onChange={setVariant} />
          <TextInput label="Label" value={text} onChange={setText} />
          <Toggle label="Disabled" value={disabled} onChange={setDisabled} />
        </>
      }
    >
      <Button variant={variant} disabled={disabled}>
        {text || "Click Me"}
      </Button>
    </SpecimenCard>
  );
}
