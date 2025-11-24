import { Page, Skeleton, Text } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { ScrollText } from "lucide-react";

export default function ScannerLoading() {
  const items = Array.from({ length: 3 }, (_, index) => index);

  return (
    <Page className="p-4 space-y-4 flex flex-col">
      {/* Title skeleton */}
      <Text className="text-2xl font-bold">
        <Skeleton className="h-8 w-32" />
      </Text>

      {/* Event overview skeleton */}
      <div className="w-full">
        <div className="rounded-xl bg-card p-4 flex gap-4 items-center">
          <Skeleton className="size-12 rounded-md" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>

      {/* Guests overview skeleton */}
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[450px] rounded-xl bg-card p-4 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Progress bar */}
          <Skeleton className="h-2 w-full rounded-full" />

          {/* Guests summary grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-4">
            {items.map((item) => (
              <div
                key={item}
                className="flex flex-col items-center justify-center bg-muted/60 rounded-lg py-3.5 px-2 gap-2"
              >
                <Skeleton className="h-6 w-10" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guests button skeleton (top-right icon button) */}
      <Button
        className="absolute border-none! right-4 p-2! h-8 top-4 rounded-full! text-md text-muted-foreground pointer-events-none"
        variant="outline"
      >
        <ScrollText className="size-4" />
      </Button>

      {/* Main bottom button skeleton */}
      <div className="mt-auto">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </Page>
  );
}
