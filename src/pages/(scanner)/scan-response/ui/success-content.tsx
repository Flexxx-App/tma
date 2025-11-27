import { TicketCheck } from "lucide-react";

import { Text } from "@/shared/ui";

import type { SuccessContentProps } from "./scan-response.types";

export const SuccessContent = ({
  guestName,
  passName,
}: SuccessContentProps) => (
  <div className="space-y-4 pt-1">
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/60 p-3 text-xs">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium text-muted-foreground">
          GUEST
        </span>
        <span className="truncate font-medium">{guestName}</span>
      </div>
      <div className="flex flex-col gap-1 items-end text-right">
        <span className="text-[10px] font-medium text-muted-foreground">
          PASS
        </span>
        <span className="font-mono text-[11px] opacity-80">{passName}</span>
      </div>
    </div>

    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5">
      <Text className="text-[11px] text-emerald-100/90 leading-relaxed">
        Use the button
        <span className="font-semibold"> “See Guest”</span>
        to open full guest details and history for this pass.
      </Text>
    </div>
  </div>
);
