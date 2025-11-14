"use client";

import { ConnectPage as ConnectPageComponent } from "@/pages/(facetix)/connect/ui/connect-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export function ConnectPage() {
  useBackButton();
  return <ConnectPageComponent />;
}
