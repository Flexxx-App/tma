"use client";

import { IntroPage } from "@/pages/(facetix)/intro/ui/intro-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export function FacetixPage() {
  useBackButton();
  return <IntroPage />;
}
