"use client";

import * as React from "react";

export function VisitNotify() {
  React.useEffect(() => {
    fetch("/api/visit").catch(() => {});
  }, []);
  return null;
}
