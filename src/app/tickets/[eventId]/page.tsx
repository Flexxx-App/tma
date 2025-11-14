"use client";

import React from "react";
import { TicketsPage as TicketsPageComponent } from "@/pages/(tickets)/ui/tickets-page";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useMainButton } from "@/shared/tma/useMainButton";

export default function TicketsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = React.use(params);
  useBackButton();
  useMainButton({
    text: "Transfer",
    isVisible: true,
    isEnabled: true,
    isLoaderVisible: false,
    isShineEffectEnabled: false,
    onClick: () => {
      console.log("Transfer");
    },
  });
  return <TicketsPageComponent eventId={eventId} />;
}
