"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Page, Text } from "@/shared/ui";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useBackButton } from "@/shared/tma/useBackButton";

import { TransferQrCard } from "./transfer-qr-card";
import { ShareTransferCard } from "./share-transfer-card";

const generateTransferLink = (token: string, fallbackLink?: string) => {
  if (fallbackLink) {
    return fallbackLink;
  }

  const url = new URL("https://t.me/flexxxme_bot/ticket_transfer");
  url.searchParams.set("startapp", token);
  return url.toString();
};

const shareTransferLink = (transferLink: string) => {
  const tg = (window as any)?.Telegram?.WebApp;
  const text = `I’m transferring you passes! Open your personal link and get your tickets: ${transferLink}`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    transferLink,
  )}&text=${encodeURIComponent(text)}`;

  if (tg && typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(shareUrl);
  } else {
    window.open(shareUrl, "_blank");
  }
};

export const TransferResultPage = () => {
  useBackButton();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const token = searchParams?.get("token") ?? "";
  const linkFromParams = searchParams?.get("link") ?? undefined;

  const transferLink = useMemo(() => {
    if (!token && !linkFromParams) {
      return "";
    }
    return generateTransferLink(token, linkFromParams);
  }, [token, linkFromParams]);

  return (
    <Page className="relative flex h-full flex-col space-y-4 p-4 gap-3">
      <Text
        component="h1"
        className="mb-1! text-2xl font-semibold tracking-tight"
      >
        Share it!
      </Text>
      <TransferQrCard transferLink={transferLink} />
      <ShareTransferCard
        transferLink={transferLink}
        onCopyLink={() => {
          navigator.clipboard.writeText(transferLink);
        }}
      />
      <MainButton
        text="Share"
        onClick={() => {
          shareTransferLink(transferLink);
        }}
      />
    </Page>
  );
};
