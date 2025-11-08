"use client";

import { cn } from "@/shared/lib/utils";
import { IPass } from "../model/types";
import { useState, useEffect, useRef, useMemo } from "react";
import { generateTOTP } from "../lib/totp-generator";
import { Text } from "@/shared/ui/text";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import QRCodeStyling from "qr-code-styling";
import AppLogo from "@/shared/assets/logo.jpg";
import { Clock } from "lucide-react";
import { formatValidDateTime } from "../lib/formatValidDate";

interface IProps {
  className?: string;
  pass: IPass;
}

export const PassCard = ({ className, pass, ...props }: IProps) => {
  const { secret } = pass;
  const timeStep = 15;
  const [code, setCode] = useState(() => generateTOTP(secret, timeStep));
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return timeStep - (now % timeStep);
  });
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling>(null);

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      setSecondsLeft(timeStep - (now % timeStep));
      if (now % timeStep === 0) {
        setCode(generateTOTP(secret, timeStep));
      }
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [secret]);

  const data = useMemo(
    () => ({
      pass: {
        id: pass.id,
        eventId: pass.eventId,
        userId: pass.userId,
        createdAt: pass.createdAt,
      },
      validationCode: code,
    }),
    [pass.id, pass.eventId, pass.userId, pass.createdAt, code]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = "";
    }
    if (qrCodeRef.current) {
      qrCodeRef.current = null;
    }
    qrCodeRef.current = new QRCodeStyling({
      data: JSON.stringify(data),
      width: 275,
      height: 275,
      margin: 0,
      image: AppLogo.src,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
      cornersSquareOptions: { type: "extra-rounded" },
      cornersDotOptions: { type: "rounded" },
      backgroundOptions: { color: "#ffffff" },
      dotsOptions: { type: "rounded" },
    });

    if (ref.current) {
      qrCodeRef.current.append(ref.current);
    }
  }, [data]);
  const userLocale = useMemo(() => {
    return navigator.language;
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl border bg-card/30 backdrop-blur p-6 shadow-sm",
        "flex flex-col items-center justify-center gap-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <Badge
          variant={pass.status === "active" ? "default" : "outline"}
          className={cn(
            "text-xs font-medium",
            pass.status === "active"
              ? "bg-green-500/10 text-green-500"
              : "bg-yellow-500/10 text-muted-foreground"
          )}
        >
          {pass.status === "active" ? "Active" : "Scanned"}
        </Badge>
        <Text className="text-base font-semibold tracking-tight">
          {pass.name}
        </Text>
        {pass.validFrom || pass.validTo ? (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <Text className="text-muted-foreground text-xs">
              {formatValidDateTime(pass.validFrom || "", userLocale)} -{" "}
              {formatValidDateTime(pass.validTo || "", userLocale)}
            </Text>
          </div>
        ) : null}
      </div>
      <div className="size-85 rounded-xl bg-card p-3 ring-1 ring-border shadow-sm flex justify-center items-center">
        <div ref={ref} className="rounded-lg overflow-hidden" />
      </div>
      <div
        suppressHydrationWarning
        className="flex flex-col items-center justify-center gap-2 overflow-hidden w-full"
      >
        <div className="w-80">
          <Progress value={secondsLeft} max={timeStep} className="h-1.5" />
        </div>
        <Text className="text-muted-foreground text-xs">
          QR-code will be rotated in:{" "}
          <span className="font-mono tabular-nums" suppressHydrationWarning>
            {secondsLeft}
          </span>{" "}
          seconds
        </Text>
      </div>
    </div>
  );
};
