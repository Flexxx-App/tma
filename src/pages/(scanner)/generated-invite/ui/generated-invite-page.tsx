"use client";

import { useMemo } from "react";

import { Page, Text } from "@/shared/ui";
import { InviteQrCard } from "./invite-qr-card";
import { ShareInviteCard } from "./share-invite-card";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useBackButton } from "@/shared/tma/useBackButton";
import { useGetInviteQuery } from "@/entities/invite/model/api";

const generateInviteLink = (inviteId: string) => {
  const url = new URL("https://t.me/flexxxme_bot/invitation");
  url.searchParams.set("startapp", inviteId);
  return url.toString();
};

const shareInviteLink = (inviteLink: string) => {
  const tg = (window as any)?.Telegram?.WebApp;
  const text = `I'm inviting you to my event! Open your personal link and get your tickets: ${inviteLink}`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    inviteLink,
  )}&text=${encodeURIComponent(text)}`;

  if (tg && typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(shareUrl);
  } else {
    window.open(shareUrl, "_blank");
  }
};

type GeneratedInvitePageProps = {
  inviteId: string;
};

export const GeneratedInvitePage = ({ inviteId }: GeneratedInvitePageProps) => {
  useBackButton();
  const { data: invite } = useGetInviteQuery(inviteId);

  const inviteIdentifier = invite?.id ?? inviteId;

  const inviteLink = useMemo(
    () => generateInviteLink(inviteIdentifier),
    [inviteIdentifier],
  );

  return (
    <Page className="relative flex h-full flex-col space-y-4 p-4 gap-4">
      <Text
        component="h1"
        className="mb-1! text-2xl font-semibold tracking-tight"
      >
        Share it!
      </Text>
      <InviteQrCard inviteLink={inviteLink} />
      <ShareInviteCard
        inviteLink={inviteLink}
        onCopyLink={() => {
          navigator.clipboard.writeText(inviteLink);
        }}
      />
      <MainButton
        text="Share"
        onClick={() => {
          shareInviteLink(inviteLink);
        }}
      />
    </Page>
  );
};
