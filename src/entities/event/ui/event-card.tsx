import Image from "next/image";
import { Badge, Text } from "@/shared/ui";
import { IEvent } from "../model/types";
import { cn } from "@/shared/lib/utils";
import { ChevronRight } from "lucide-react";
import { formatDate } from "../lib/format-date";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  event: IEvent;
  className?: string;
}

type EventStatus = "upcoming" | "past";

const getEventStatus = (startsAt: string): EventStatus => {
  const now = new Date();
  const eventDate = new Date(startsAt);
  return eventDate > now ? "upcoming" : "past";
};

export const EventCard: React.FC<IProps> = ({ event, className, ...props }) => {
  const { posterUrl, title, startsAt } = event;
  const status = getEventStatus(startsAt);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "flex gap-4 px-6 py-4 rounded-md w-full items-center justify-between transition-colors duration-300 hover:bg-accent/50 cursor-pointer",
        "bg-card/30",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "bg-cover bg-center bg-no-repeat",
          "blur-2xl scale-110 opacity-60"
        )}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />

      <div className="flex gap-4 ">
        <Image
          src={posterUrl}
          alt={title}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-sm aspect-square sm:block hidden"
        />
        <div className="flex flex-col gap-1">
          <Badge
            variant={status === "past" ? "default" : "outline"}
            className={cn(
              "text-xs font-normal",
              status === "upcoming"
                ? "bg-green-500/10 text-green-500"
                : status === "past"
                ? "bg-gray-500/10 text-muted-foreground"
                : "bg-yellow-500/10 text-muted-foreground"
            )}
          >
            {status}
          </Badge>
          <Text>{title}</Text>
          <Text className="text-sm text-muted-foreground -mt-1">
            {formatDate(startsAt)}
          </Text>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  );
};
