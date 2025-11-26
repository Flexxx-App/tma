"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";

import { useIsClient } from "@/app/_providers/is-client-ctx";
import { Page, Particles } from "@/shared/ui";
import {
  useAcceptInviteMutation,
  useGetInviteQuery,
} from "@/entities/invite/model/api";
import { useGetEventQuery } from "@/entities/event/model/api";
import { useMainButton } from "@/shared/tma/useMainButton";

import { InvitationLoadingState } from "./invitation-loading-state";
import { InvitationUnavailableState } from "./invitation-unavailable-state";
import { InvitationValidCard } from "./invitation-valid-card";

export const InvitationPage = () => {
  const isClient = useIsClient();
  const router = useRouter();

  const launchParams = useMemo(
    () => (isClient ? retrieveLaunchParams() : null),
    [isClient],
  );

  const invitationId =
    (launchParams && "tgWebAppStartParam" in launchParams
      ? (launchParams as any).tgWebAppStartParam
      : null) ?? null;

  const {
    data: invitation,
    isLoading,
    isError,
  } = useGetInviteQuery(invitationId as string, {
    skip: !invitationId,
  });

  const { data: event, isLoading: isEventLoading } =
    useGetEventQuery(invitation?.event_id ?? "", {
      skip: !invitation?.event_id,
    }) ?? {};

  const [acceptInvite, { isLoading: isAccepting }] = useAcceptInviteMutation();

  const totalUses = invitation?.uses?.length ?? 0;
  const hasRemainingUses =
    typeof invitation?.max_uses === "number"
      ? invitation.max_uses > totalUses
      : false;

  const now = useMemo(() => new Date(), []);

  const isBeforeStart =
    invitation?.valid_from != null
      ? now < new Date(invitation.valid_from)
      : false;
  const isAfterEnd =
    invitation?.valid_until != null
      ? now > new Date(invitation.valid_until)
      : false;

  const isInviteValid =
    !!invitation && hasRemainingUses && !isBeforeStart && !isAfterEnd;

  useMainButton({
    text: "Accept",
    isVisible: isInviteValid,
    isEnabled: isInviteValid && !isAccepting,
    isLoaderVisible: isAccepting,
    onClick: async () => {
      if (!invitationId || !isInviteValid) return;
      try {
        toast.dismiss();
        await acceptInvite(invitationId as string).then((res) => {
          if (res.error) {
            toast.error("Failed to accept invitation");
          } else {
            toast.success("Invitation accepted");
            router.push("/");
          }
        });
      } catch {
        toast.dismiss();
        toast.error("Failed to accept invitation");
      }
    },
  });

  if (!isClient) {
    return null;
  }

  const showInvalidState =
    !invitationId || isError || (!isLoading && !isInviteValid);

  return (
    <Page className="relative flex h-full flex-col items-center justify-start overflow-hidden px-4 py-4">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        quantity={60}
        staticity={40}
        ease={80}
        size={0.6}
        color="#6d28d9"
        vx={0.02}
        vy={0.02}
      />

      <AnimatePresence initial={true} mode="wait">
        {isLoading && !invitation && <InvitationLoadingState />}

        {showInvalidState && !isLoading && (
          <InvitationUnavailableState
            invitationId={invitationId}
            isError={isError}
            isBeforeStart={isBeforeStart}
            isAfterEnd={isAfterEnd}
            hasRemainingUses={hasRemainingUses}
          />
        )}

        {invitation && isInviteValid && (
          <InvitationValidCard
            invitation={invitation}
            hasRemainingUses={hasRemainingUses}
            totalUses={totalUses}
            event={event}
            isEventLoading={isEventLoading ?? false}
          />
        )}
      </AnimatePresence>
    </Page>
  );
};
