"use client";

import { motion } from "motion/react";

import { Text } from "@/shared/ui";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const ClaimLoadingState = () => {
  return (
    <motion.div
      className="flex w-full max-w-md flex-col gap-4 pt-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="space-y-2">
        <Skeleton className="h-7 w-40 rounded-full" />
        <Skeleton className="h-4 w-64 rounded-full" />
      </div>

      <Card className="rounded-3xl bg-card/80 shadow-md">
        <CardHeader className="gap-2 pb-4">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-4 w-52 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div className="flex gap-3">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-3 w-40 rounded-full" />
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-3 w-24 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Text
        component="p"
        className="text-xs text-muted-foreground text-center px-4"
      >
        We are securely claiming your passes. This may take a few seconds.
      </Text>
    </motion.div>
  );
}


