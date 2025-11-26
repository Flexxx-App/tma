import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Text,
} from "@/shared/ui";
import type { IInvite } from "@/entities/invite/model/types";
import type { IEvent } from "@/entities/event/model/types";
import { formatDate } from "@/entities/event/lib/format-date";

type InvitationValidCardProps = {
  invitation: IInvite;
  hasRemainingUses: boolean;
  totalUses: number;
  event?: IEvent;
  isEventLoading: boolean;
};

export const InvitationValidCard = ({
  invitation,
  hasRemainingUses,
  totalUses,
  event,
  isEventLoading,
}: InvitationValidCardProps) => {
  const validFrom = invitation.valid_from
    ? new Date(invitation.valid_from)
    : null;
  const validUntil = invitation.valid_until
    ? new Date(invitation.valid_until)
    : null;

  const hasTimeLimit = !!validFrom || !!validUntil;
  const shouldShowEventSection = Boolean(invitation.event_id);

  const formattedEventStart =
    event?.starts_at != null
      ? `${formatDate(event.starts_at)} · ${new Date(
          event.starts_at,
        ).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : null;

  const spotsLeft = hasRemainingUses
    ? invitation.max_uses - totalUses
    : 0;

  return (
    <motion.div
      key="valid"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Card className="relative overflow-hidden bg-gradient-to-b from-background/80 to-background/30 shadow-lg">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-violet-500/20 via-transparent to-transparent blur-2xl" />
        <CardHeader className="relative">
          <div className="flex items-center gap-2">
            <Text
              component="span"
              className="text-xs text-muted-foreground"
            >
              {hasRemainingUses
                ? `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`
                : "No spots left"}
            </Text>
          </div>
          <CardTitle className="mt-2 text-2xl font-semibold tracking-tight">
            You&apos;re invited to the event
          </CardTitle>
          <CardDescription className="mt-1">
            Claim your invitation to join the event and receive your personal
            tickets directly in Flex.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative flex flex-col gap-4 pt-1">
          {hasTimeLimit && (
            <motion.div
              className="flex gap-4 rounded-lg border bg-background/70 p-3 text-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.12,
              }}
            >
              <div className="flex flex-1 flex-col gap-1">
                <Text
                  component="p"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                >
                  Time limit
                </Text>
                <Text component="p" className="font-medium">
                  {[
                    validFrom
                      ? `From ${validFrom.toLocaleString()}`
                      : null,
                    validUntil
                      ? `until ${validUntil.toLocaleString()}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </Text>
                <Text
                  component="p"
                  className="text-xs text-muted-foreground"
                >
                  Make sure to accept your invitation before it expires.
                </Text>
              </div>
            </motion.div>
          )}

          {shouldShowEventSection && (
            <AnimatePresence mode="wait" initial={false}>
              {isEventLoading && !event ? (
                <motion.div
                  key="event-skeleton"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex gap-4 rounded-lg border bg-background/70 p-3"
                >
                  <div className="h-16 w-16 rounded-md bg-muted/80 animate-pulse" />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-4 w-32 rounded-md bg-muted/80 animate-pulse" />
                    <div className="h-3 w-24 rounded-md bg-muted/70 animate-pulse" />
                    <div className="h-3 w-40 rounded-md bg-muted/70 animate-pulse" />
                  </div>
                </motion.div>
              ) : (
                event && (
                  <motion.div
                    key="event-info"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="relative flex gap-4 overflow-hidden rounded-lg border bg-background/80 p-3 items-center"
                  >
                    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/10 via-transparent to-amber-500/10" />
                    {event.poster_url && (
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={event.poster_url}
                          alt={event.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Text
                        component="p"
                        className="truncate text-sm font-medium"
                      >
                        {event.name}
                      </Text>
                      {formattedEventStart && (
                        <Text
                          component="p"
                          className="text-xs text-muted-foreground"
                        >
                          {formattedEventStart}
                        </Text>
                      )}
                      {event.event_venue?.city && (
                        <Text
                          component="p"
                          className="text-xs text-muted-foreground"
                        >
                          {event.event_venue.city}
                          {event.event_venue.country
                            ? `, ${event.event_venue.country}`
                            : ""}
                        </Text>
                      )}
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          )}

          <Text component="p" className="text-xs text-muted-foreground">
            When you tap the main button, we&apos;ll confirm your invitation and
            redirect you to the home screen. If something goes wrong, you&apos;ll
            see a short notification.
          </Text>
        </CardContent>
      </Card>
    </motion.div>
  );
};


