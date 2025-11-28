"use client";

import React from "react";
import { TicketsPage as TicketsPageComponent } from "@/pages/(tickets)/ui/tickets-page";
import { useBackButton } from "@/shared/tma/useBackButton";

export default function TicketsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = React.use(params);
  useBackButton();
  return <TicketsPageComponent eventId={eventId} />;
}
