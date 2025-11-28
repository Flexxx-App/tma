"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import type { IPass } from "@/entities/passes/model/types";

export type PassesSheetProps = {
  passes: IPass[];
  selectedPassIds: Set<string>;
  isOpen: boolean;
  onClose: () => void;
  onTogglePass: (id: string) => void;
  onClearSelection: () => void;
};

export const PassesSheet = ({
  passes,
  selectedPassIds,
  isOpen,
  onClose,
  onTogglePass,
}: PassesSheetProps) => {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DrawerContent className="border-border/80">
        <DrawerHeader className="flex flex-row items-start justify-between gap-2 pb-3">
          <div className="space-y-1 text-left">
            <DrawerTitle className="text-base font-semibold">
              Select passes
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              Tap to choose which passes you want to transfer.
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

        <div className="max-h-[320px] space-y-2 overflow-y-auto px-4 pb-4">
          {passes.length ? (
            <AnimatePresence initial={false}>
              {passes.map((pass) => {
                const isSelected = selectedPassIds.has(pass.id);

                return (
                  <motion.button
                    key={pass.id}
                    type="button"
                    layout
                    onClick={() => onTogglePass(pass.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/60",
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="mr-3 flex-1 space-y-0.5">
                      <Text component="p" className="text-sm font-medium">
                        {pass.name}
                      </Text>
                      <Text
                        component="p"
                        className="text-xs text-muted-foreground"
                      >
                        ID: {pass.id}
                      </Text>
                    </div>

                    <div
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/80 text-muted-foreground",
                      )}
                    >
                      {isSelected ? "Selected" : "Tap to select"}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          ) : (
            <Text
              component="p"
              className="py-6 text-center text-xs text-muted-foreground"
            >
              You don&apos;t have any passes for this event yet.
            </Text>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};


