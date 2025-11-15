import { Skeleton } from "@/shared/ui";

export default function EventsLoading() {
  const events = Array.from({ length: 3 }, (_, index) => index);
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      {events.map((event) => (
        <Skeleton key={event} className="w-full h-20" />
      ))}
    </div>
  );
}
