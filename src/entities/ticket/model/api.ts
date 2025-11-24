import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type { ITicket } from "@/entities/ticket/model/types";

interface ITicketsPageParam {
  offset: number;
  limit: number;
}

interface ITicketsQueryArg {
  eventId: string;
}

export const ticketApiSlice = createApi({
  reducerPath: "ticketApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/tickets" }),
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    getTickets: builder.infiniteQuery<
      ITicket[],
      ITicketsQueryArg,
      ITicketsPageParam
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
        const eventId = queryArg?.eventId;
        const url = `/`;
        const params = {
          event_id: eventId,
          limit: limit.toString(),
          offset: offset.toString(),
        };
        return {
          url,
          method: "GET",
          params,
        };
      },
      providesTags: (result) => [
        { type: "Ticket" as const, id: "LIST" },
        ...(result?.pages?.flatMap((page) =>
          page.map(({ id }) => ({ type: "Ticket" as const, id })),
        ) ?? []),
      ],
    }),
  }),
});

export const { useGetTicketsInfiniteQuery } = ticketApiSlice;
export const useGetTickets = ticketApiSlice.useGetTicketsInfiniteQuery;
