"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Page } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  useGetPassesQuery,
  useTransferPassesMutation,
} from "@/entities/passes/model/api";
import { TicketList } from "./ticket-list";
import { TicketListLoading } from "./ticket-list-loading";
import { PassesSheet } from "./passes-sheet";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

interface IProps {
  className?: string;
  eventId: string;
}

export function TicketsPage({ className, eventId, ...props }: IProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPassIds, setSelectedPassIds] = useState<Set<string>>(
    () => new Set(),
  );

  const { passes, isLoading } = useGetPassesQuery(eventId, {
    skip: !eventId,
    selectFromResult: (result) => {
      return {
        passes: result.data?.passes ?? [],
        total: result.data?.total ?? 0,
        isLoading: result.isLoading,
        isFetching: result.isFetching,
      };
    },
  });

  const [transferPasses, { isLoading: isTransferLoading }] =
    useTransferPassesMutation();

  const hasPasses = passes.length > 0;
  const isInitialLoading = isLoading && passes.length === 0;

  const handleTogglePass = useCallback((id: string) => {
    setSelectedPassIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedPassIds(new Set());
  }, []);

  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const isConfirmEnabled = useMemo(
    () => selectedPassIds.size > 0 && !isTransferLoading,
    [selectedPassIds.size, isTransferLoading],
  );

  const handleConfirmTransfer = useCallback(async () => {
    if (!selectedPassIds.size) return;

    try {
      const passesPayload = Array.from(selectedPassIds).map((id) => ({ id }));
      const result = await transferPasses({ passes: passesPayload }).unwrap();

      const searchParams = new URLSearchParams();
      searchParams.set("token", result.transfer_token);

      router.push(`/tickets/transfer?${searchParams.toString()}`);

      setIsSheetOpen(false);
      setSelectedPassIds(new Set());
    } catch (_error) {
      toast.error("Failed to transfer passes. Please try again.");
    }
  }, [router, selectedPassIds, transferPasses]);

  return (
    <Page
      className={cn(
        "flex flex-col gap-2 flex-1 justify-center items-center h-full",
        className,
      )}
      {...props}
    >
      {isInitialLoading ? (
        <TicketListLoading />
      ) : (
        <TicketList passes={passes} />
      )}

      <PassesSheet
        passes={passes}
        selectedPassIds={selectedPassIds}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onTogglePass={handleTogglePass}
        onClearSelection={handleClearSelection}
      />

      <MainButton
        text={isSheetOpen ? "Send" : "Transfer"}
        progress={isTransferLoading}
        onClick={() => {
          if (!hasPasses || isTransferLoading) return;
          if (!isSheetOpen) {
            setIsSheetOpen(true);
          } else if (isConfirmEnabled) {
            void handleConfirmTransfer();
          }
        }}
      />
    </Page>
  );
}
