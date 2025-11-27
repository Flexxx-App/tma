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
import { cva } from "class-variance-authority";

interface IProps {
  className?: string;
  pass: IPass;
}

type PassStatus = "valid" | "revoked" | "scanned";

const passStatusBadgeVariants = cva("text-xs font-medium", {
  variants: {
    status: {
      valid: "bg-green-500/10 text-green-500",
      scanned: "bg-yellow-500/10 text-yellow-500",
      revoked: "bg-red-500/10 text-red-500",
    },
  },
  defaultVariants: {
    status: "valid",
  },
});

const passStatusLabel: Record<PassStatus, string> = {
  valid: "Valid",
  revoked: "Revoked",
  scanned: "Scanned",
};

const passStatusVariant: Record<
  PassStatus,
  "default" | "outline" | "destructive"
> = {
  valid: "default",
  scanned: "outline",
  revoked: "destructive",
};

const isPassStatus = (status: string): status is PassStatus =>
  ["valid", "revoked", "scanned"].includes(status as PassStatus);

export const PassCard = ({ className, pass, ...props }: IProps) => {
  const { totp_secret } = pass;
  const normalizedStatus = isPassStatus(pass.status) ? pass.status : "valid";
  const timeStep = 15;
  const [code, setCode] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return timeStep - (now % timeStep);
  });
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling>(null);
  const [isFading, setIsFading] = useState(false);
  const fadeDurationMs = 250;

  useEffect(() => {
    const update = async () => {
      const now = Math.floor(Date.now() / 1000);
      setSecondsLeft(timeStep - (now % timeStep));
      if (now % timeStep === 0) {
        const code = await generateTOTP(totp_secret, timeStep);
        setCode(String(code));
      }
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [totp_secret]);

  const data = useMemo(
    () => ({
      pass: {
        id: pass.id,
        guest_id: pass.guest_id,
        created_at: pass.created_at,
      },
      validationCode: code,
    }),
    [pass.id, pass.guest_id, pass.created_at, code],
  );

  // Create QR instance once
  useEffect(() => {
    if (qrCodeRef.current) return;
    qrCodeRef.current = new QRCodeStyling({
      data: "{}", // initial placeholder, will be updated below
      width: 200,
      height: 200,
      margin: 2,
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
  }, []);

  // Smoothly update QR data with fade transition
  useEffect(() => {
    if (!qrCodeRef.current) return;
    const start = window.setTimeout(() => setIsFading(true), 0);
    const t = window.setTimeout(() => {
      qrCodeRef.current?.update({ data: JSON.stringify(data) });
      setIsFading(false);
    }, fadeDurationMs);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(t);
    };
  }, [data]);
  const userLocale = useMemo(() => {
    return navigator.language;
  }, []);

  return (
    <div
      className={cn(
        "w-fit mx-auto max-w-md border rounded-2xl bg-card/50 backdrop-blur p-6 shadow-sm",
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <Badge
          variant={passStatusVariant[normalizedStatus]}
          className={cn(passStatusBadgeVariants({ status: normalizedStatus }))}
        >
          {passStatusLabel[normalizedStatus]}
        </Badge>
        <Text className="text-base font-semibold tracking-tight">
          {pass.name}
        </Text>
        {pass.valid_from || pass.valid_until ? (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <Text className="text-muted-foreground text-xs">
              {formatValidDateTime(pass.valid_from || "", userLocale)} -{" "}
              {formatValidDateTime(pass.valid_until || "", userLocale)}
            </Text>
          </div>
        ) : null}
      </div>
      <div className="size-60 rounded-xl bg-card p-2 ring-border shadow-sm flex justify-center items-center">
        <div
          ref={ref}
          className={cn(
            "rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out will-change-auto",
            isFading ? "opacity-0" : "opacity-100",
          )}
        />
      </div>
      <div
        suppressHydrationWarning
        className="flex flex-col items-center justify-center gap-2 overflow-hidden w-full"
      >
        <div className="w-55">
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
