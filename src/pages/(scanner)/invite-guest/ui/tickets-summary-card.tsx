import { Ticket } from "lucide-react";

import { Skeleton, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import type { GuestTicket } from "./types";

type TicketsSummaryCardProps = {
  tickets: GuestTicket[];
  selectedTickets: GuestTicket[];
  onOpenSelector: () => void;
  isTicketsLoading: boolean;
};

export const TicketsSummaryCard = ({
  tickets,
  selectedTickets,
  onOpenSelector,
  isTicketsLoading,
}: TicketsSummaryCardProps) => {
  return (
    <Card className="rounded-2xl bg-card/80">
      <CardHeader className="gap-1 pb-3">
        <CardTitle className="text-sm font-semibold">
          Tickets to issue
        </CardTitle>
        <CardDescription className="text-xs">
          Choose which tickets will be attached to this invite.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pb-4">
        {isTicketsLoading ? (
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedTickets.length ? (
              selectedTickets.map((ticket) => (
                <span
                  key={ticket.id}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  <span>{ticket.name}</span>
                  {ticket.quantity > 1 ? (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary/90">
                      ×{ticket.quantity}
                    </span>
                  ) : null}
                </span>
              ))
            ) : (
              <Text component="p" className="text-xs text-muted-foreground">
                No tickets selected yet.
              </Text>
            )}
          </div>
        )}

        {isTicketsLoading ? (
          <Skeleton className="h-8 w-full rounded-xl" />
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-dashed"
            onClick={onOpenSelector}
          >
            <Ticket className="size-4" />
            <span className="text-xs font-medium">
              {tickets.length ? "Select tickets" : "No available tickets"}
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
