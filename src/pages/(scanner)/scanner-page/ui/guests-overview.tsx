"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";

export default function StatisticCard6() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

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
                12 / <span className="text-xs text-muted-foreground">100</span>
              </span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Guests summary */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-green-500">28</span>
                <span className="text-xs text-accent-foreground">Inside</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-yellow-500">14</span>
                <span className="text-xs text-accent-foreground">In Queue</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-1">
                <span className="text-lg font-bold text-violet-500">8</span>
                <span className="text-xs text-accent-foreground">Incoming</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
