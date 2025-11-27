"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { Page, Particles } from "@/shared/ui";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useMainButton } from "@/shared/tma/useMainButton";
import { useIsClient } from "@/app/_providers/is-client-ctx";
import { useScanPassMutation } from "@/entities/passes/model/api";
import type { IScanPassResponse } from "@/entities/passes/model/types";

import { type ScanState } from "./scan-response.types";
import { StatusHeader } from "./status-header";
import { LoadingContent } from "./loading-content";
import { ErrorContent } from "./error-content";
import { SuccessContent } from "./success-content";
import { NoParamsFallback } from "./no-params-fallback";
import { getErrorMessage } from "./get-error-message";
import type { IPass } from "@/entities/passes/model/types";

export const ScanResponsePage = () => {
  const isClient = useIsClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useBackButton();

  const passId = searchParams?.get("passId");
  const validationCode = searchParams?.get("validationCode");
  const guestId = searchParams?.get("guestId");

  const [pass, setPass] = useState<IPass | undefined>();

  const [scanPass, { data, isLoading, isError, isSuccess, error }] =
    useScanPassMutation();

  useEffect(() => {
    if (!isClient) return;
    if (!passId || !validationCode) return;

    const fetchPass = async () => {
      const { data } = await scanPass({
        passId,
        validationCode,
      });
      setPass(data?.pass_data);
    };
    fetchPass();
  }, [isClient, passId, validationCode, scanPass]);

  const state: ScanState = useMemo(() => {
    if (!passId || !validationCode) return "error";
    if (isLoading && !isSuccess && !isError) return "loading";
    if (isSuccess) return "success";
    if (isError) return "error";
    return "idle";
  }, [isLoading, isSuccess, isError, passId, validationCode]);

  const scanData = data as IScanPassResponse | undefined;
  const passName = scanData?.pass_data?.name ?? "Pass";
  const guestName = scanData?.guest?.fullname ?? "Guest";

  useMainButton({
    text: "See Guest",
    isVisible: isClient && state === "success" && !!guestId,
    isEnabled: state === "success" && !!guestId,
    isLoaderVisible: false,
    onClick: guestId
      ? () => {
          router.push(`/scanner/guests/${guestId}`);
        }
      : undefined,
  });

  if (!isClient) {
    return null;
  }

  const isErrorState = state === "error" || !passId || !validationCode;
  const errorMessage = isErrorState ? getErrorMessage(error) : "";

  const gradientClass =
    state === "success"
      ? "from-emerald-500/40 via-emerald-500/10 to-background"
      : "from-rose-500/40 via-rose-500/10 to-background";

  const particlesColor = state === "success" ? "#22c55e" : "#fb7185";

  return (
    <Page className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 py-6">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        quantity={50}
        staticity={40}
        ease={80}
        size={0.6}
        color={particlesColor}
        vx={0.015}
        vy={0.015}
      />

      <AnimatePresence initial={true} mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="w-full max-w-md"
        >
          <div
            className={`relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b ${gradientClass} p-[1px] shadow-xl backdrop-blur`}
          >
            <div className="relative flex flex-col gap-5 rounded-3xl bg-background/90 px-5 py-6">
              <StatusHeader state={state} isErrorState={isErrorState} />

              {state === "loading" && <LoadingContent />}

              {isErrorState && state !== "loading" && (
                <ErrorContent message={errorMessage} />
              )}

              {state === "success" && (
                <SuccessContent
                  passName={pass?.name ?? ""}
                  guestName={guestName}
                />
              )}

              {!passId && !validationCode && <NoParamsFallback />}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Page>
  );
};
