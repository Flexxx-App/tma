"use client";

import { Skeleton } from "@/shared/ui";

const SKELETON_PASSES_COUNT = 1;

export const TicketListLoading = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center -mt-20 w-full">
      {Array.from({ length: SKELETON_PASSES_COUNT }).map((_, index) => (
        <div
          key={index}
          className="w-fit mx-auto max-w-md border rounded-2xl bg-card/50 backdrop-blur p-6 shadow-sm flex flex-col items-center justify-center gap-2"
        >
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-32 rounded-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </div>
          <div className="size-60 rounded-xl bg-card p-2 ring-border shadow-sm flex justify-center items-center">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 overflow-hidden w-full">
            <div className="w-56">
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};


