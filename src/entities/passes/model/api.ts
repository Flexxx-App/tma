import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type {
  IPassesResponse,
  IScanPassResponse,
  ITransferPassesResponse,
  IClaimPassesResponse,
} from "@/entities/passes/model/types";

type TransferPassesRequest = {
  passes: { id: string }[];
};

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
    transferPasses: builder.mutation<
      ITransferPassesResponse,
      TransferPassesRequest
    >({
      query: ({ passes }) => ({
        url: `/transfer`,
        method: "POST",
        data: {
          passes,
        },
      }),
    }),
    claimPasses: builder.mutation<
      IClaimPassesResponse,
      { transfer_token: string }
    >({
      query: ({ transfer_token }) => ({
        url: `/claim`,
        method: "POST",
        data: {
          transfer_token,
        },
      }),
    }),
  }),
});

export const {
  useGetPassesQuery,
  useScanPassMutation,
  useTransferPassesMutation,
  useClaimPassesMutation,
} = passesApiSlice;
