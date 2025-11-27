import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type {
  IPassesResponse,
  IScanPassResponse,
} from "@/entities/passes/model/types";

export const passesApiSlice = createApi({
  reducerPath: "passesApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/passes" }),
  tagTypes: ["Pass"],
  endpoints: (builder) => ({
    getPasses: builder.query<IPassesResponse, string, undefined>({
      query: (eventId) => ({
        url: `/`,
        method: "GET",
        params: { event_id: eventId ?? undefined },
      }),
      providesTags: (_result, _error, eventId) => [
        { type: "Pass" as const, id: eventId ?? "LIST" },
      ],
    }),
    scanPass: builder.mutation<
      IScanPassResponse,
      { passId: string; validationCode: string }
    >({
      query: ({ passId, validationCode }) => ({
        url: `/scan`,
        method: "POST",
        data: {
          id: passId,
          validation_code: validationCode,
        },
      }),
    }),
  }),
});

export const { useGetPassesQuery, useScanPassMutation } = passesApiSlice;
