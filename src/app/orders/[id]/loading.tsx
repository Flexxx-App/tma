import { Page, Skeleton } from "@/shared/ui";

export default function OrderLoading() {
  return (
    <Page className="flex flex-col gap-7 p-4 mb-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-36" />
        <div className="flex justify-between items-center gap-4 rounded-md bg-card p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-col gap-3 rounded-md bg-card p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="h-px w-full bg-border/40" />

          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((key) => (
              <div key={key} className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-border/40" />

          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-col gap-4 rounded-md bg-card p-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="h-px w-full bg-border/40" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>

          <div className="h-px w-full bg-border/40" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </Page>
  );
}
