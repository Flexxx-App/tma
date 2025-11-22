"use client";

import { useMemo, useCallback } from "react";
import { Page } from "@/shared/ui";
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

export const EventTicketsPage: React.FC<IProps> = ({ className, ...props }) => {
  const { data: user } = useGetMeQuery();

  const now = useMemo(() => new Date().toISOString(), []);

  const upcomingQueryArgs = useMemo(
    () =>
      user?.id
        ? {
            user_id: user.id,
            start_date: now,
            end_date: null,
          }
        : skipToken,
    [user?.id, now],
  );

  const pastQueryArgs = useMemo(
    () =>
      user?.id
        ? {
            user_id: user.id,
            start_date: null,
            end_date: now,
          }
        : skipToken,
    [user?.id, now],
  );

  const selectFromResult = useCallback((state: any) => {
    const { data, isLoading, isFetchingNextPage, hasNextPage } = state;
    return {
      events: data?.pages.flatMap((page: IEvent[]) => page) ?? [],
      total: data?.pages.flatMap((page: IEvent[]) => page.length) ?? 0,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
    };
  }, []);

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
        <TabsContents>
          <TabsContent value="upcoming" className="w-full">
            <EventListWidget
              events={upcomingEvents}
              isLoading={isLoadingUpcomingEvents}
              isFetchingNextPage={isFetchingNextPageUpcomingEvents}
              hasNextPage={hasNextPageUpcomingEvents}
              fetchNextPage={fetchNextPageUpcomingEvents}
              emptyText="No tickets found"
            />
          </TabsContent>
          <TabsContent value="past" className="w-full">
            <EventListWidget
              events={pastEvents}
              isLoading={isLoadingPastEvents}
              isFetchingNextPage={isFetchingNextPagePastEvents}
              hasNextPage={hasNextPagePastEvents}
              fetchNextPage={fetchNextPagePastEvents}
              emptyText="No tickets found"
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </Page>
  );
};
