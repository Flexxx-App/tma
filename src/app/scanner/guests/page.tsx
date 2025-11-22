"use client";
import { GuestsPage as GuestsPageComponent } from "@/pages/(scanner)/guests-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export default function GuestsPage() {
  useBackButton();
  return <GuestsPageComponent />;
}
