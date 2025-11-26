"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldTitle,
} from "@/shared/ui/field";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Text } from "@/shared/ui/text";
import { cn } from "@/shared/lib/utils";

type MaxUsesProps = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  /**
   * Optional hard upper limit just in case business logic needs it later.
   * Not enforced by the API yet, only on the client.
   */
  max?: number;
  className?: string;
};

const QUICK_PRESETS = [1, 5, 10, 20];

export const MaxUses = ({
  value,
  onChange,
  min = 1,
  max,
  className,
}: MaxUsesProps) => {
  const [internalValue, setInternalValue] = useState<number>(value ?? min);

  const current = typeof value === "number" ? value : internalValue;

  const clamp = (next: number) => {
    const withMin = Math.max(min, Number.isFinite(next) ? next : min);
    if (typeof max === "number") {
      return Math.min(max, withMin);
    }
    return withMin;
  };

  const update = (next: number) => {
    const clamped = clamp(next);
    setInternalValue(clamped);
    onChange?.(clamped);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      // allow empty while typing, but keep internal state unchanged
      event.target.value = String(current);
      return;
    }
    update(Number(raw));
  };

  const handleIncrement = () => {
    update(current + 1);
  };

  const handleDecrement = () => {
    update(current - 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(className)}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Max uses</CardTitle>
          <CardDescription className="mt-0.5 text-[11px]">
            How many times this invite can be used in total. Minimum is 1.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                onClick={handleDecrement}
                disabled={current <= min}
              >
                <Minus className="size-4" />
              </Button>

              <motion.div
                key={current}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative flex-1"
              >
                <Input
                  type="tel"
                  inputMode="numeric"
                  min={min}
                  max={max}
                  value={current}
                  onChange={handleInputChange}
                  className="h-10 rounded-xl text-center text-base font-semibold tracking-wide"
                  aria-label="Max uses for this invite"
                />
              </motion.div>

              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                onClick={handleIncrement}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_PRESETS.map((preset) => (
                <motion.button
                  key={preset}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
                    current === preset
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/70 bg-background/40 text-foreground/80 hover:bg-muted/60",
                  )}
                  onClick={() => update(preset)}
                >
                  ×{preset}
                </motion.button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
