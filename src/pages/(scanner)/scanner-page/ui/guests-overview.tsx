"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";

interface IProps {
  inside: number;
  inQueue: number;
  incoming: number;
  total: number;
}

export const GuestsOverview = ({
  inside,
  inQueue,
  incoming,
  total,
}: IProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress((inside / total) * 100), 500);
    return () => clearTimeout(timer);
  }, [inside, total]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full md:w-[450px]">
        <CardHeader>
          <CardTitle>Guests</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="grow mb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">Total</span>
              <span className="text-sm font-semibold text-success">
                {inside} /{" "}
                <span className="text-xs text-muted-foreground">{total}</span>
              </span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Guests summary */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-green-500">
                  {inside}
                </span>
                <span className="text-xs text-accent-foreground">Inside</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-yellow-500">
                  {inQueue}
                </span>
                <span className="text-xs text-accent-foreground">In Queue</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-violet-500">
                  {incoming}
                </span>
                <span className="text-xs text-accent-foreground">Incoming</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
