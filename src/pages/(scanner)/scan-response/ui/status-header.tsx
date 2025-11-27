import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Spinner, Text } from "@/shared/ui";

import type { StatusHeaderProps } from "./scan-response.types";

export const StatusHeader = ({ state, isErrorState }: StatusHeaderProps) => {
  const isSuccess = state === "success";

  return (
    <div className="flex items-center gap-3">
      <div
        className={
          isSuccess
            ? "flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400"
            : "flex size-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400"
        }
      >
        {isSuccess ? (
          <CheckCircle2 className="size-6" />
        ) : isErrorState ? (
          <AlertTriangle className="size-6" />
        ) : (
          <Spinner className="size-6" />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <Text className="text-base font-semibold tracking-tight">
          {isSuccess
            ? "Pass confirmed"
            : isErrorState
              ? "Pass is invalid"
              : "Validating pass"}
        </Text>
        <Text className="text-xs text-muted-foreground">
          {isSuccess
            ? "Guest can safely enter the event."
            : isErrorState
              ? "This QR code cannot be used to enter."
              : "Please wait, we are checking the QR code."}
        </Text>
      </div>
    </div>
  );
};


