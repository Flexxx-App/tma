import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { IGuestsResponse } from "@/entities/guest/model/types";

interface IGuestsPageParam {
  offset: number;
  limit: number;
}

interface IGuestsQueryArg {
  eventId: string;
}

export const guestApiSlice = createApi({
  reducerPath: "guestApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/guests" }),
  tagTypes: ["Guest"],
  endpoints: (builder) => ({
    getGuests: builder.infiniteQuery<
      IGuestsResponse,
      IGuestsQueryArg,
      IGuestsPageParam
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 10,
        },
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          const nextOffset = lastPageParam.offset + lastPageParam.limit;
          const remainingItems = (lastPage?.data?.length ?? 0) - nextOffset;
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
        { type: "Guest" as const, id: "LIST" },
        ...(result?.pages?.flatMap(
          (page) =>
            page.data?.map(({ id }) => ({ type: "Guest" as const, id })) ?? [],
        ) ?? []),
      ],
    }),
  }),
});

export const { useGetGuestsInfiniteQuery } = guestApiSlice;
