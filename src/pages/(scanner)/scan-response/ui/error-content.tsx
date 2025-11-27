import { InfoIcon } from "lucide-react";

import { Text } from "@/shared/ui";

import type { ErrorContentProps } from "./scan-response.types";

export const ErrorContent = ({ message }: ErrorContentProps) => (
  <div className="space-y-4 pt-1">
    <div className="space-y-1">
      <Text className="text-sm font-medium">Why this pass is invalid</Text>
      <Text className="text-xs text-muted-foreground leading-relaxed">
        {message}
      </Text>
    </div>

    <div className="flex flex-col gap-2 rounded-2xl bg-rose-500/5 p-3">
      <div className="flex items-center gap-2 text-xs text-rose-100/80">
        <InfoIcon className="size-3.5" />
        <span className="font-medium tracking-tight">What guest can do</span>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-[11px] text-rose-50/80">
        <li>Ask to re-open the original QR code in Telegram.</li>
        <li>Make sure the ticket was not already scanned.</li>
        <li>Contact the organizer if the problem repeats.</li>
      </ul>
    </div>
  </div>
);


