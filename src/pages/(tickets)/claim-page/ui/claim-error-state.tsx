"use client";

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

import { Text } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type ClaimErrorStateProps = {
  hasToken: boolean;
};

export const ClaimErrorState = ({ hasToken }: ClaimErrorStateProps) => {
  const title = hasToken ? "Passes already claimed" : "Link is not valid";
  const description = hasToken
    ? "These passes have already been claimed by someone else or the transfer has expired."
    : "We couldn’t find a transfer token. Try opening the link from Telegram again.";

  return (
    <motion.div
      className="flex w-full max-w-md flex-col gap-4 pt-8"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="rounded-3xl bg-destructive/5 border border-destructive/20 shadow-sm">
        <CardHeader className="flex-row items-center gap-3 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
            <CardDescription className="text-xs">
              Something went wrong while trying to claim these passes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <Text component="p" className="text-xs text-muted-foreground">
            {description}
          </Text>
          <Text
            component="p"
            className="text-[11px] text-muted-foreground/80"
          >
            If you believe this is a mistake, ask the sender to generate a new
            transfer link and try again.
          </Text>
        </CardContent>
      </Card>
    </motion.div>
  );
};


