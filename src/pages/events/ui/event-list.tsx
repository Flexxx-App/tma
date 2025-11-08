import { IEvent } from "@/entities/event/model/types";
import { cn } from "@/shared/lib/utils";
import { EventCard } from "@/entities/event/ui/event-card";
import Link from "next/link";

interface IProps {
  className?: string;
  events: IEvent[];
}

export const EventListWidget: React.FC<IProps> = ({
  className,
  events,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-4 p-4", className)} {...props}>
      {events.map((event) => (
        <Link key={event.id} href={`/tickets/${event.id}`}>
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
};
