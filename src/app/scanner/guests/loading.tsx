import { Page, Skeleton } from "@/shared/ui";

async function GuestsLoading() {
  const items = Array.from({ length: 4 }, (_, index) => index);

  return (
    <Page className="p-4 space-y-4 flex flex-col">
      {/* Title skeleton */}
      <Skeleton className="h-8 w-32" />

      {/* Search input skeleton */}
      <Skeleton className="h-10 w-full rounded-xl" />

      {/* Guests list skeleton */}
      <div className="flex flex-col gap-4 flex-1">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-md bg-card p-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>

      {/* Bottom button skeleton */}
      <Skeleton className="h-12 w-full rounded-full mt-auto" />
    </Page>
  );
}

export default GuestsLoading;
