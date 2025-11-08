"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/shared/lib/utils";

function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const safeMax = typeof max === "number" && max > 0 ? max : 100;
  const rawValue = typeof value === "number" ? value : 0;
  const clampedValue = Math.min(Math.max(rawValue, 0), safeMax);
  const percent = (clampedValue / safeMax) * 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 overflow-hidden rounded-full w-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("bg-primary h-full flex-1 transition-all")}
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
