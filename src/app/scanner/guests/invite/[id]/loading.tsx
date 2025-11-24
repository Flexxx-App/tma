import { Page, Skeleton, Text } from "@/shared/ui";

export default function InviteGuestLoading() {
  return (
    <Page className="relative flex h-full flex-col space-y-4 p-4 gap-4">
      {/* Title skeleton (Share it!) */}
      <Text className="mb-1! text-2xl font-semibold tracking-tight">
        <Skeleton className="h-8 w-32" />
      </Text>

      {/* QR card skeleton */}
      <div className="mt-2 flex flex-col items-center gap-4 rounded-3xl bg-card/80 px-5 py-6 shadow-md">
        <div className="flex w-fit items-center justify-center rounded-3xl bg-muted p-4">
          <Skeleton className="h-48 w-48 rounded-xl" />
        </div>

        <div className="space-y-2 text-center w-full">
          <Skeleton className="mx-auto h-4 w-56" />
          <Skeleton className="mx-auto h-3 w-64" />
        </div>
      </div>

      {/* Share invite card skeleton */}
      <div className="rounded-2xl bg-card/80">
        <div className="gap-1 pb-3 px-4 pt-4 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="space-y-3 pb-4 px-4">
          <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-64" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
      </div>
    </Page>
  );
}
