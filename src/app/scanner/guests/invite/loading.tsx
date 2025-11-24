import { Page, Skeleton, Text } from "@/shared/ui";

export default function InviteGuestLoading() {
  const items = Array.from({ length: 3 }, (_, index) => index);

  return (
    <Page className="relative flex h-full flex-col space-y-4 p-4 gap-4">
      {/* Title skeleton */}
      <Text className="text-2xl font-semibold tracking-tight">
        <Skeleton className="h-8 w-32" />
      </Text>

      {/* Tickets summary card skeleton */}
      <div className="rounded-xl bg-card p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-3 rounded-md bg-muted/40 p-3"
            >
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom button skeleton */}
      <div className="mt-auto">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </Page>
  );
}
