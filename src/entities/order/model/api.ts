import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { IOrder } from "@/entities/order/model/types";

interface IOrdersPageParam {
  offset: number;
  limit: number;
}

interface IOrdersQueryArg {
  user_id: string;
}

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/orders" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query<IOrder, string, undefined>({
      query: (id) => ({ url: `/${id}`, method: "GET" }),
    }),
    getOrders: builder.infiniteQuery<
      IOrder[],
      IOrdersQueryArg,
      IOrdersPageParam
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
          buyer_id: user_id,
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
        { type: "Order" as const, id: "LIST" },
        ...(result?.pages?.flatMap((page) =>
          page.map(({ id }) => ({ type: "Order" as const, id })),
        ) ?? []),
      ],
    }),
  }),
});

export const { useGetOrdersInfiniteQuery, useGetOrderQuery } = orderApiSlice;
