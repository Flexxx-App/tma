import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";

import type { GuestTicket } from "./types";

type TicketsSheetProps = {
  tickets: GuestTicket[];
  selectedTicketIds: Set<string>;
  isOpen: boolean;
  onClose: () => void;
  onToggleTicket: (id: string) => void;
  onClearSelection: () => void;
  onChangeQuantity: (id: string, quantity: number) => void;
};

export const TicketsSheet = ({
  tickets,
  selectedTicketIds,
  isOpen,
  onClose,
  onToggleTicket,
  onClearSelection,
  onChangeQuantity,
}: TicketsSheetProps) => {
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
              Select tickets
            </DrawerTitle>
            <DrawerDescription className="text-xs">
              Tap to select multiple tickets.
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
          {tickets.length ? (
            <AnimatePresence initial={false}>
              {tickets.map((ticket) => {
                const isSelected = selectedTicketIds.has(ticket.id);
                const quantity = ticket.quantity ?? 1;

                return (
                  <motion.button
                    key={ticket.id}
                    type="button"
                    layout
                    onClick={() => onToggleTicket(ticket.id)}
                    className={cn(
                      "flex w-full h-12! items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/60",
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="mr-3 flex-1 space-y-0.5">
                      <Text component="p" className="text-sm font-medium">
                        {ticket.name}
                      </Text>
                      {ticket.description ? (
                        <Text
                          component="p"
                          className="text-xs text-muted-foreground"
                        >
                          {ticket.description}
                        </Text>
                      ) : null}
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          key="quantity-widget"
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[11px] shadow-sm"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <button
                            type="button"
                            className="flex size-5 items-center justify-center rounded-full bg-muted/60 text-[11px] leading-none"
                            onClick={() =>
                              onChangeQuantity(
                                ticket.id,
                                Math.max(1, quantity - 1),
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={1}
                            value={quantity}
                            onChange={(event) => {
                              const next = Number.parseInt(
                                event.target.value,
                                10,
                              );
                              if (Number.isNaN(next)) return;
                              onChangeQuantity(ticket.id, Math.max(1, next));
                            }}
                            className="w-9 border-none bg-transparent p-0 text-center text-xs font-medium outline-none"
                          />
                          <button
                            type="button"
                            className="flex size-5 items-center justify-center rounded-full  bg-muted/60 text-[11px] leading-none"
                            onClick={() =>
                              onChangeQuantity(
                                ticket.id,
                                Math.max(1, quantity + 1),
                              )
                            }
                          >
                            +
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          ) : (
            <Text
              component="p"
              className="py-6 text-center text-xs text-muted-foreground"
            >
              You don&apos;t have any tickets...
            </Text>
          )}
        </div>

        <DrawerFooter className="flex flex-row items-center justify-between gap-2 pb-5 pt-1">
          <Button
            type="button"
            variant="ghost"
            className="flex-1 rounded-xl"
            onClick={onClearSelection}
            disabled={!selectedTicketIds.size}
          >
            Clear selection
          </Button>
          <DrawerClose asChild>
            <Button type="button" className="flex-1 rounded-xl">
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
