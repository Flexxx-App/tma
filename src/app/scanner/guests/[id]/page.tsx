"use client";
import { GuestInfoPage as GuestInfoPageComponent } from "@/pages/(scanner)/guest-info/ui/guest-info-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export function GuestInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  useBackButton()
  return <GuestInfoPageComponent id={id} />;
}
