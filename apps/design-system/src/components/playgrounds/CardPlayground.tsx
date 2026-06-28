"use client";

import * as React from "react";
import { Card } from "@portfolio/ui";
import { Toggle } from "../controls/Toggle";
import { TextInput } from "../controls/TextInput";
import { SpecimenCard } from "../SpecimenCard";

export function CardPlayground() {
  const [title, setTitle] = React.useState("Project Card");
  const [desc, setDesc] = React.useState("A short description of the project goes here.");
  const [hasLink, setHasLink] = React.useState(false);

  const code = `<Card
  title="${title}"
  description="${desc}"${hasLink ? '\n  href="/"' : ""}
/>`;

  return (
    <SpecimenCard
      name="Card"
      props={`title="${title}"`}
      code={code}
      controls={
        <>
          <TextInput label="Title" value={title} onChange={setTitle} />
          <TextInput label="Description" value={desc} onChange={setDesc} />
          <Toggle label="Link" value={hasLink} onChange={setHasLink} />
        </>
      }
    >
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <Card title={title} description={desc} href={hasLink ? "#" : undefined} />
      </div>
    </SpecimenCard>
  );
}
