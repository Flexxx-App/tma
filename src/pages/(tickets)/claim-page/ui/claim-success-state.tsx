"use client";

import { motion } from "motion/react";
import { Sparkles, Ticket } from "lucide-react";

import { Text } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import type { IPass } from "@/entities/passes/model/types";

type ClaimSuccessStateProps = {
  passes: IPass[];
  eventName?: string;
  onShowTickets: () => void;
};

export const ClaimSuccessState = ({
  passes,
  eventName,
  onShowTickets,
}: ClaimSuccessStateProps) => {
  const passesCount = passes.length;

  return (
    <motion.div
      className="flex w-full max-w-md flex-col gap-5 pt-6"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-0.5">
          <Text component="h1" className="text-lg font-semibold leading-tight">
            Passes claimed!
          </Text>
          <Text
            component="p"
            className="text-xs text-muted-foreground line-clamp-2"
          >
            {eventName
              ? `You’ve successfully received passes for ${eventName}.`
              : "You’ve successfully received your passes."}
          </Text>
        </div>
      </div>

      <Card className="rounded-3xl bg-card/85 shadow-md border border-border/60">
        <CardHeader className="gap-1.5 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-primary/10">
              <Ticket className="h-3.5 w-3.5 text-primary" />
            </span>
            Your tickets are ready
          </CardTitle>
          <CardDescription className="text-xs">
            {passesCount > 0
              ? `You’ve got ${passesCount} ${
                  passesCount === 1 ? "ticket" : "tickets"
                } on your account.`
              : "Your tickets are now linked to your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <div className="rounded-2xl bg-muted/60 px-4 py-3 space-y-1.5">
            <Text
              component="p"
              className="text-xs font-medium text-foreground/90"
            >
              What’s next?
            </Text>
            <Text
              component="p"
              className="text-[11px] leading-relaxed text-muted-foreground"
            >
              You can view your passes, check details and get ready for the
              event on the tickets page.
            </Text>
          </div>
        </CardContent>
      </Card>
      <MainButton text="Show Tickets" onClick={onShowTickets} />
    </motion.div>
  );
};
