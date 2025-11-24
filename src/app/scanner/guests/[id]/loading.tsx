import { Field, FieldContent, FieldLabel, Page, Skeleton } from "@/shared/ui";

export default function GuestInfoLoading() {
  return (
    <Page className="flex flex-col gap-4 p-4">
      {/* Avatar + basic info */}
      <div className="flex flex-col items-center gap-3 pt-6">
        <Skeleton className="size-32 rounded-full" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Details section */}
      <Field>
        <FieldLabel className="text-muted-foreground">
          <Skeleton className="h-3 w-16" />
        </FieldLabel>
        <FieldContent>
          <div className="flex flex-col gap-2 bg-card rounded-md p-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </FieldContent>
      </Field>

      {/* Tickets section */}
      <Field>
        <FieldLabel className="text-muted-foreground">
          <Skeleton className="h-3 w-16" />
        </FieldLabel>
        <FieldContent>
          <div className="flex flex-col gap-2 bg-card rounded-md p-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex justify-between gap-4">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </FieldContent>
      </Field>

      {/* Products section */}
      <Field>
        <FieldLabel className="text-muted-foreground">
          <Skeleton className="h-3 w-16" />
        </FieldLabel>
        <FieldContent>
          <div className="flex flex-col gap-2 bg-card rounded-md p-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex justify-between gap-4">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </FieldContent>
      </Field>
    </Page>
  );
}
