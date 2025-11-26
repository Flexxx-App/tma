"use client";

import { useRef } from "react";
import { Page, Skeleton } from "@/shared/ui";
import { EventListWidget } from "./event-list";
import { cn } from "@/shared/lib/utils";
import { useGetMeQuery } from "@/entities/user/model/api";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/shared/ui/tabs";
import { useGetEventsInfiniteQuery } from "@/entities/event/model/api";
import type { IEvent } from "@/entities/event/model/types";
import { hapticFeedback } from "@tma.js/sdk";

interface IProps {
  className?: string;
}

const EventCardSkeleton: React.FC = () => {
  return (
    <div
      className={cn(
        "w-full h-20 bg-card/30 flex items-center justify-between rounded-md py-3 px-4",
      )}
    >
      <div className="flex gap-4 w-full items-center justify-between w-full">
        <div className="flex gap-4 items-center">
          <Skeleton className="hidden sm:block w-16 h-16 rounded-sm" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EventListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full py-4 px-4">
      {[0, 1, 2].map((idx) => (
        <EventCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export const EventTicketsPage: React.FC<IProps> = ({ className, ...props }) => {
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();

  const nowRef = useRef(new Date().toISOString());
  const now = nowRef.current;

  const upcomingQueryArgs = user?.id
    ? {
        user_id: user.id,
        start_date: now,
        end_date: null,
      }
    : skipToken;

  const pastQueryArgs = user?.id
    ? {
        user_id: user.id,
        start_date: null,
        end_date: now,
      }
    : skipToken;

  const selectFromResult = (state: any) => {
    const { data, isLoading, isFetchingNextPage, hasNextPage } = state;
    return {
      events: data?.pages.flatMap((page: IEvent[]) => page) ?? [],
      total: data?.pages.flatMap((page: IEvent[]) => page.length) ?? 0,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
    };
  };

  const {
    events: upcomingEvents,
    isLoading: isLoadingUpcomingEvents,
    isFetchingNextPage: isFetchingNextPageUpcomingEvents,
    hasNextPage: hasNextPageUpcomingEvents,
    fetchNextPage: fetchNextPageUpcomingEvents,
  } = useGetEventsInfiniteQuery(upcomingQueryArgs, {
    selectFromResult,
  });

  const {
    events: pastEvents,
    isLoading: isLoadingPastEvents,
    isFetchingNextPage: isFetchingNextPagePastEvents,
    hasNextPage: hasNextPagePastEvents,
    fetchNextPage: fetchNextPagePastEvents,
  } = useGetEventsInfiniteQuery(pastQueryArgs, {
    selectFromResult,
  });

  const showUpcomingSkeletons =
    isUserLoading ||
    isLoadingUpcomingEvents ||
    (isFetchingNextPageUpcomingEvents && !hasNextPageUpcomingEvents);

  const showPastSkeletons =
    isUserLoading ||
    isLoadingPastEvents ||
    (isFetchingNextPagePastEvents && !hasNextPagePastEvents);

  return (
    <Page className={cn("flex flex-col gap-2", className)} {...props}>
      <Tabs
        defaultValue="upcoming"
        className="w-full rounded-lg justify-center items-center"
      >
        <TabsList
          className="grid w-fit grid-cols-2 justify-center items-center mt-4"
          onClick={() => {
            hapticFeedback.impactOccurred("light");
          }}
        >
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContents className="w-full!">
          <TabsContent value="upcoming" className="w-full!">
            {showUpcomingSkeletons ? (
              <EventListSkeleton />
            ) : (
              <EventListWidget
                events={upcomingEvents}
                isLoading={isUserLoading || isLoadingUpcomingEvents}
                isFetchingNextPage={isFetchingNextPageUpcomingEvents}
                hasNextPage={hasNextPageUpcomingEvents}
                fetchNextPage={fetchNextPageUpcomingEvents}
                emptyText="No tickets found"
              />
            )}
          </TabsContent>
          <TabsContent value="past" className="w-full">
            {showPastSkeletons ? (
              <EventListSkeleton />
            ) : (
              <EventListWidget
                events={pastEvents}
                isLoading={isUserLoading || isLoadingPastEvents}
                isFetchingNextPage={isFetchingNextPagePastEvents}
                hasNextPage={hasNextPagePastEvents}
                fetchNextPage={fetchNextPagePastEvents}
                emptyText="No tickets found"
              />
            )}
          </TabsContent>
        </TabsContents>
      </Tabs>
    </Page>
  );
};
