"use client";

import { motion } from "motion/react";
import { IEvent } from "@/entities/event/model/types";
import { cn } from "@/shared/lib/utils";
import { EventCard } from "@/entities/event/ui/event-card";
import Link from "next/link";
import { InfiniteScroll } from "@/shared/ui";
import {
  Empty,
  EmptyContent,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/shared/ui/empty";
import { Ghost } from "lucide-react";

interface IProps {
  className?: string;
  events: IEvent[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  emptyText?: string;
}

export const EventListWidget: React.FC<IProps> = ({
  className,
  events,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  emptyText,
  fetchNextPage,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-4 p-4", className)} {...props}>
      {(Array.isArray(events) && events.length > 0) ||
      isLoading ||
      (isFetchingNextPage && !hasNextPage) ? (
        <InfiniteScroll
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        >
          {events?.map((event, index) => (
            <Link key={event.id} href={`/tickets/${event.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: index * 0.03 }}
              >
                <EventCard event={event} />
              </motion.div>
            </Link>
          ))}
        </InfiniteScroll>
      ) : (
        <Empty>
          <EmptyContent className="flex flex-col items-center justify-center gap-0!">
            <EmptyMedia variant="icon">
              <Ghost className="size-4" />
            </EmptyMedia>
            <EmptyTitle>{emptyText || "No events found"}</EmptyTitle>
            <EmptyDescription>
              Browse events and get back later.
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};
