"use client";

import { cn } from "@/shared/lib/utils";
import { IPass } from "../model/types";
import { QRCode } from "@/shared/ui/qr-code";
import { useState, useEffect } from "react";
import { generateTOTP } from "../lib/totp-generator";
import { Text } from "@/shared/ui/text";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";

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

  const data = {
    pass: {
      id: pass.id,
      eventId: pass.eventId,
      userId: pass.userId,
      createdAt: pass.createdAt,
    },
    validationCode: code,
  };

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
      </div>
      <div className="size-85 rounded-xl bg-card p-3 ring-1 ring-border shadow-sm">
        <QRCode
          data={JSON.stringify(data)}
          className="rounded-lg overflow-hidden size-full"
        />
      </div>
      <div
        suppressHydrationWarning
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <Progress value={secondsLeft} max={timeStep} className="h-1.5" />
        <Text className="text-muted-foreground text-xs">
          QR-code will be updated in:{" "}
          <span className="font-mono tabular-nums">{secondsLeft}</span> seconds
        </Text>
      </div>
    </div>
  );
};
