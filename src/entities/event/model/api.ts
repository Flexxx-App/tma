import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type { IApiEventResponse } from "./types";
import type { IEvent } from "@/entities/event/model/types";

interface IEventsPageParam {
  offset: number;
  limit: number;
}

interface IEventsQueryArg {
  user_id: string;
  start_date?: string | null;
  end_date?: string | null;
}

export const eventApiSlice = createApi({
  reducerPath: "eventApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvent: builder.query<IEvent, string, undefined>({
      query: (id) => ({ url: `/${id}` }),
    }),
    getEventBySlug: builder.query<IApiEventResponse, string, undefined>({
      query: (slug) => ({ url: `/slug/${slug}` }),
    }),
    getEvents: builder.infiniteQuery<
      IEvent[],
      IEventsQueryArg,
      IEventsPageParam
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 10,
        },
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          const nextOffset = lastPageParam.offset + lastPageParam.limit;
          const remainingItems = (lastPage?.length ?? 0) - nextOffset;
          if (remainingItems <= 0) {
            return undefined;
          }
          return {
            ...lastPageParam,
            offset: nextOffset,
          };
        },
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
          const prevOffset = firstPageParam.offset - firstPageParam.limit;
          if (prevOffset < 0) return undefined;
          return {
            ...firstPageParam,
            offset: prevOffset,
          };
        },
      },
      query: ({ queryArg, pageParam }) => {
        const { offset, limit } = pageParam;
        const user_id = queryArg?.user_id;
        const url = `/`;
        const params = {
          user_id,
          limit: limit.toString(),
          offset: offset.toString(),
          end_date: queryArg?.end_date ?? undefined,
          start_date: queryArg?.start_date ?? undefined,
        };
        return {
          url,
          method: "GET",
          params,
        };
      },
      providesTags: (result) => [
        { type: "Event" as const, id: "LIST" },
        ...(result?.pages?.flatMap((page) =>
          page.map(({ id }) => ({ type: "Event" as const, id })),
        ) ?? []),
      ],
    }),
  }),
});

export const {
  useGetEventQuery,
  useGetEventBySlugQuery,
  useGetEventsInfiniteQuery,
} = eventApiSlice;
