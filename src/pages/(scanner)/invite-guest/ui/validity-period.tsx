"use client";

import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Clock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { Calendar } from "@/shared/ui/calendar";
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

type ValidityPeriodValue = {
  from: Date | null;
  to: Date | null;
};

type ValidityPeriodProps = {
  value?: ValidityPeriodValue;
  onChange?: (value: ValidityPeriodValue) => void;
  className?: string;
};

const defaultFromTime = "09:00";
const defaultToTime = "23:59";

function mergeDateAndTime(date: Date | null, time: string): Date | null {
  if (!date) return null;
  const [hours, minutes] = time.split(":").map((part) => Number(part) || 0);
  const merged = new Date(date);
  merged.setHours(hours, minutes, 0, 0);
  return merged;
}

function formatDateTimeRange(value: ValidityPeriodValue | null): string {
  if (!value?.from || !value?.to) {
    return "Not set – invite will be valid immediately after creation.";
  }

  const sameDay =
    value.from.getFullYear() === value.to.getFullYear() &&
    value.from.getMonth() === value.to.getMonth() &&
    value.from.getDate() === value.to.getDate();

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  });

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const fromDate = dateFormatter.format(value.from);
  const toDate = dateFormatter.format(value.to);
  const fromTime = timeFormatter.format(value.from);
  const toTime = timeFormatter.format(value.to);

  if (sameDay) {
    return `${fromDate}, ${fromTime} – ${toTime}`;
  }

  return `${fromDate}, ${fromTime} → ${toDate}, ${toTime}`;
}

export const ValidityPeriod = ({
  value,
  onChange,
  className,
}: ValidityPeriodProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialRange: DateRange | undefined = useMemo(() => {
    if (!value?.from && !value?.to) return undefined;
    return {
      from: value?.from ?? undefined,
      to: value?.to ?? undefined,
    };
  }, [value?.from, value?.to]);

  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [fromTime, setFromTime] = useState(defaultFromTime);
  const [toTime, setToTime] = useState(defaultToTime);

  const hasSelection = !!range?.from && !!range?.to;

  const currentValue: ValidityPeriodValue | null = useMemo(() => {
    if (!hasSelection) return null;
    return {
      from: mergeDateAndTime(range.from ?? null, fromTime),
      to: mergeDateAndTime(range.to ?? null, toTime),
    };
  }, [range?.from, range?.to, fromTime, toTime, hasSelection]);

  const handleApply = () => {
    if (!currentValue) {
      setIsOpen(false);
      return;
    }

    onChange?.(currentValue);
    setIsOpen(false);
  };

  const handleClear = () => {
    setRange(undefined);
    onChange?.({ from: null, to: null });
  };

  const summaryText = useMemo(
    () =>
      formatDateTimeRange(currentValue ?? value ?? { from: null, to: null }),
    [currentValue, value],
  );

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cn(className)}
      >
        <Card className="rounded-2xl bg-card/80 backdrop-blur-sm shadow-sm">
          <CardHeader className="gap-1 pb-3">
            <CardTitle className="text-sm font-semibold">
              Validity period
            </CardTitle>
            <CardDescription className="text-xs">
              Choose when this invite starts and stops being valid.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-dashed px-3 py-2"
              onClick={() => setIsOpen(true)}
            >
              <div className="flex items-center gap-1 text-left">
                <span className="inline-flex size-7 items-center justify-center rounded-full text-primary">
                  <CalendarDays className="size-4" />
                </span>
                <div className="flex flex-col">
                  <Text component="span" className="text-xs font-semibold">
                    Choose
                  </Text>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setIsOpen(false);
        }}
      >
        <DrawerContent className="border-border/80">
          <DrawerHeader className="flex flex-row items-start justify-between gap-2 pb-3">
            <div className="space-y-1 text-left">
              <DrawerTitle className="text-base font-semibold">
                Validity period
              </DrawerTitle>
              <DrawerDescription className="text-xs">
                Select a date range and time when this invite can be used.
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="-mr-1 mt-1 shrink-0"
              >
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="space-y-4 overflow-y-auto px-4 pb-4">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(nextRange) => setRange(nextRange ?? undefined)}
              numberOfMonths={1}
              defaultMonth={range?.from}
              className="rounded-xl border bg-transparent! w-full h-[440px]! overflow-hidden"
            />
          </div>

          <DrawerFooter className="flex flex-row items-center justify-between gap-2 pb-5 pt-1">
            <Button
              type="button"
              variant="ghost"
              className="flex-1 rounded-xl"
              onClick={handleClear}
              disabled={!value?.from && !value?.to && !hasSelection}
            >
              Clear
            </Button>
            <Button
              type="button"
              className="flex-1 rounded-xl"
              onClick={handleApply}
              disabled={!hasSelection}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
