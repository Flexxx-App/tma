"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Page, Text } from "@/shared/ui";
import { useBackButton } from "@/shared/tma/useBackButton";

import type { GuestTicket } from "./types";
import { TicketsSummaryCard } from "./tickets-summary-card";
import { TicketsSheet } from "./tickets-sheet";
import { MaxUses } from "./max-uses";
import { ValidityPeriod } from "./validity-period";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/navigation";
import { useGetTickets } from "@/entities/ticket/model/api";
import { useCreateInviteMutation } from "@/entities/invite/model/api";

export const InviteGuestPage = () => {
  const router = useRouter();
  useBackButton();

  const [eventId, setEventId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<GuestTicket[]>([]);
  const [selectedTicketIds, setSelectedTicketIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [isTicketsPopoverOpen, setIsTicketsPopoverOpen] = useState(false);
  const [maxUses, setMaxUses] = useState<number>(1);
  const [validityPeriod, setValidityPeriod] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const { data: ticketsData, isLoading: isTicketsLoading } = useGetTickets(
    {
      eventId: eventId ?? "",
    },
    {
      skip: !eventId,
    },
  );

  const [createInvite, { isLoading: isCreatingInvite }] =
    useCreateInviteMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEventId = window.localStorage.getItem("scanner_event_id");
      setEventId(storedEventId);
    }
  }, []);

  const apiTickets = useMemo(
    () => ticketsData?.pages.flatMap((page) => page) ?? [],
    [ticketsData],
  );

  useEffect(() => {
    if (!apiTickets.length || isTicketsLoading) return;

    const nextTickets: GuestTicket[] = apiTickets.map((ticket) => ({
      id: ticket.id,
      name: ticket.name,
      description: ticket.description ?? undefined,
      quantity: 1,
    }));

    setTickets(nextTickets);
    setSelectedTicketIds(new Set(nextTickets.map((ticket) => ticket.id)));
  }, [apiTickets, isTicketsLoading]);

  const toggleTicketSelection = (id: string) => {
    setSelectedTicketIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleChangeTicketQuantity = (id: string, quantity: number) => {
    const safeQuantity = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, quantity: safeQuantity } : ticket,
      ),
    );
  };

  const clearSelection = () => {
    setSelectedTicketIds(new Set());
  };

  const selectedTickets = tickets.filter((ticket) =>
    selectedTicketIds.has(ticket.id),
  );

  const handleGenerateInvite = async () => {
    if (!eventId) {
      toast.error("Event not found. Please reopen the scanner.");
      return;
    }

    if (!selectedTickets.length) {
      toast.error("Please select at least one ticket.");
      return;
    }

    try {
      const invite = await createInvite({
        event_id: eventId ?? "",
        included_products: selectedTickets.map((ticket) => ({
          product_id: ticket.id,
          quantity: ticket.quantity ?? 1,
        })),
        max_uses: maxUses,
        valid_from: validityPeriod.from,
        valid_until: validityPeriod.to,
      }).unwrap();

      router.push(`/scanner/guests/invite/${invite.id}`);
    } catch {
      toast.error("Could not create invite. Please try again.");
    }
  };

  return (
    <Page className="relative flex h-full flex-col space-y-4 p-4 gap-2">
      <Text
        component="h1"
        className="mb-1! text-2xl font-semibold tracking-tight"
      >
        Invite guest
      </Text>

      <TicketsSummaryCard
        tickets={tickets}
        selectedTickets={selectedTickets}
        onOpenSelector={() => setIsTicketsPopoverOpen(true)}
        isTicketsLoading={isTicketsLoading}
      />

      <MaxUses value={maxUses} onChange={setMaxUses} />
      <ValidityPeriod
        value={validityPeriod}
        onChange={(next) => setValidityPeriod(next)}
      />

      <TicketsSheet
        tickets={tickets}
        selectedTicketIds={selectedTicketIds}
        isOpen={isTicketsPopoverOpen}
        onClose={() => setIsTicketsPopoverOpen(false)}
        onToggleTicket={toggleTicketSelection}
        onClearSelection={clearSelection}
        onChangeQuantity={handleChangeTicketQuantity}
      />

      {selectedTickets.length <= 0 || isTicketsPopoverOpen ? null : (
        <MainButton
          text="Generate"
          progress={isCreatingInvite}
          onClick={handleGenerateInvite}
          disabled={selectedTickets.length === 0 || isCreatingInvite}
        />
      )}
    </Page>
  );
};
