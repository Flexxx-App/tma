"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

import { Card } from "@/shared/ui/card";
import { Text } from "@/shared/ui";
import AppLogo from "@/shared/assets/logo.jpg";
import { cn } from "@/shared/lib/utils";

type TransferQrCardProps = {
  transferLink: string;
};

export const TransferQrCard = ({ transferLink }: TransferQrCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        data: transferLink,
        width: 200,
        height: 200,
        margin: 1,
        image: AppLogo.src,
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "rounded" },
        backgroundOptions: { color: "#ffffff" },
        dotsOptions: { type: "rounded" },
      });
      qrCodeRef.current.append(containerRef.current);
    } else {
      qrCodeRef.current.update({ data: transferLink });
    }
  }, [transferLink]);

  return (
    <Card className="mt-2 flex flex-col items-center gap-4 rounded-3xl bg-card/80 px-5 py-6 shadow-md">
      <div className="flex w-fit items-center justify-center rounded-3xl bg-muted p-4">
        <div
          ref={containerRef}
          className={cn(
            "rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out will-change-auto",
          )}
        />
      </div>

      <div className="space-y-1 text-center">
        <Text component="p" className="text-sm font-medium text-foreground">
          Share this QR or link to transfer your passes.
        </Text>
        <Text component="p" className="text-xs text-muted-foreground">
          Anyone with the link will be able to claim the transferred passes.
        </Text>
      </div>
    </Card>
  );
};
