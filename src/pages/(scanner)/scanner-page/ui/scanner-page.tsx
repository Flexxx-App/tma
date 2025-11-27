"use client";

import { Page } from "@/shared/ui";
import { MainButton, useScanQrPopup } from "@vkruglikov/react-telegram-web-app";
import { Text } from "@/shared/ui";
import { GuestsOverview } from "./guests-overview";
import { Button } from "@/shared/ui/button";
import { ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventOverview } from "./event-overview";
import { secondaryButton } from "@tma.js/sdk";
import { useEffect } from "react";
import { useGetEventQuery } from "@/entities/event/model/api";
import { useGetGuestsInfiniteQuery } from "@/entities/guest/model/api";

interface IScanData {
  pass: {
    id: string;
    guest_id: string;
    created_at: string;
  };
  validationCode: string;
}

export const ScannerPage = () => {
  const [showPopup, closePopup] = useScanQrPopup();
  const router = useRouter();
  const eventId = localStorage.getItem("scanner_event_id");
  const { data: event } = useGetEventQuery(eventId!, {
    skip: !eventId,
  });

  const { data: guests } = useGetGuestsInfiniteQuery({
    eventId: eventId!,
  });

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
      <EventOverview event={event!} />
      <GuestsOverview
        inside={guests?.pages[0]?.total.inside ?? 0}
        inQueue={guests?.pages[0]?.total.in_queue ?? 0}
        incoming={guests?.pages[0]?.total.incoming ?? 0}
        total={guests?.pages[0]?.total.all ?? 0}
      />
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
          showPopup(
            {
              text: "Scan to validate passes.",
            },
            (text) => {
              try {
                const data: IScanData = JSON.parse(text);
                console.log("parsed data", data);

                const params = new URLSearchParams({
                  passId: data.pass.id,
                  validationCode: String(data.validationCode),
                });

                if (data.pass.guest_id) {
                  params.set("guestId", data.pass.guest_id);
                }

                router.push(`/scanner/response?${params.toString()}`);
                closePopup();
              } catch (error) {
                console.error("Invalid JSON:", text, error);
              }
            },
          )
        }
      />
    </Page>
  );
};
