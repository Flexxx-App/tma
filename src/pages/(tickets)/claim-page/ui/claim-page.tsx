"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { AnimatePresence } from "motion/react";

import { Page, Particles } from "@/shared/ui";
import { useIsClient } from "@/app/_providers/is-client-ctx";
import { useClaimPassesMutation } from "@/entities/passes/model/api";

import { ClaimLoadingState } from "./claim-loading-state";
import { ClaimErrorState } from "./claim-error-state";
import { ClaimSuccessState } from "./claim-success-state";

export const ClaimPage = () => {
  const isClient = useIsClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const launchParams = useMemo(
    () => (isClient ? retrieveLaunchParams() : null),
    [isClient],
  );

  const decodeTokenFromTelegram = (value: string | null): string | null => {
    if (!value) return value;
    try {
      let base64 = value.replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      if (pad) {
        base64 = base64.padEnd(base64.length + (4 - pad), "=");
      }
      if (typeof atob === "function") {
        return atob(base64);
      }

      return Buffer.from(base64, "base64").toString("utf-8");
    } catch {
      return value;
    }
  };

  const tokenFromLaunch =
    launchParams && "tgWebAppStartParam" in launchParams
      ? (launchParams as any).tgWebAppStartParam
      : null;

  const decodedTokenFromLaunch = decodeTokenFromTelegram(tokenFromLaunch);

  const tokenFromQuery = searchParams?.get("token") ?? null;
  const transferToken = decodedTokenFromLaunch || tokenFromQuery;

  const [claimPasses, { data, isLoading, isError, isSuccess }] =
    useClaimPassesMutation();

  useEffect(() => {
    if (!isClient) return;
    if (!transferToken) return;

    claimPasses({ transfer_token: transferToken }).catch(() => {
      // errors handled by isError flag
    });
  }, [claimPasses, isClient, transferToken]);

  const handleShowTickets = () => {
    const eventId = data?.event?.id;

    if (eventId) {
      router.push(`/tickets/${eventId}`);
    } else {
      router.push("/");
    }
  };

  const showErrorState =
    (!transferToken && !isLoading && !isSuccess) || isError;

  return (
    <Page className="relative flex h-full flex-col items-center justify-start overflow-hidden px-4 py-4">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        quantity={60}
        staticity={40}
        ease={80}
        size={0.6}
        color="#4f46e5"
        vx={0.03}
        vy={0.02}
      />

      <AnimatePresence initial={true} mode="wait">
        {isLoading && <ClaimLoadingState />}

        {showErrorState && !isLoading && (
          <ClaimErrorState hasToken={!!transferToken} />
        )}

        {isSuccess && data && !isLoading && !showErrorState && (
          <ClaimSuccessState
            passes={data.passes ?? []}
            eventName={data.event?.name}
            onShowTickets={handleShowTickets}
          />
        )}
      </AnimatePresence>
    </Page>
  );
};
