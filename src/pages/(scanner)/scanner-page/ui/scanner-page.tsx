"use client";

import { Page } from "@/shared/ui";
import { MainButton, useScanQrPopup } from "@vkruglikov/react-telegram-web-app";
import { Text } from "@/shared/ui";
import GuestsOverview from "./guests-overview";
import { Button } from "@/shared/ui/button";
import { ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventOverview } from "./event-overview";
import { secondaryButton } from "@tma.js/sdk";
import { useEffect } from "react";

export const ScannerPage = () => {
  const [showPopup] = useScanQrPopup();
  const router = useRouter();

  useEffect(() => {
    secondaryButton.setParams({
      text: "Scan Face",
    });
    secondaryButton.show();

    return () => {
      secondaryButton.hide();
    };
  }, []);

  return (
    <Page className="p-4 space-y-4 flex flex-col">
      <Text className="text-2xl font-bold mb-4!">Overview</Text>
      <EventOverview />
      <GuestsOverview />
      <Button
        className="absolute border-none! right-4 p-2! h-8 top-4 rounded-full! text-md text-muted-foreground hover:bg-transparent hover:text-foreground"
        variant="outline"
        onClick={() => {
          router.push("/scanner/guests");
        }}
      >
        <ScrollText className="size-4" />
      </Button>
      <MainButton
        text="Scan QR"
        onClick={() =>
          showPopup({
            text: "Scan to validate passes.",
          })
        }
      />
    </Page>
  );
};
