import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import {
  IAuthScanner,
  IAuthScannerResponse,
} from "@/entities/scanner/model/types";

export const scannerApiSlice = createApi({
  reducerPath: "scannerApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/scanner" }),
  tagTypes: ["Scanner"],
  endpoints: (builder) => ({
    authScanner: builder.mutation<
      IAuthScannerResponse,
      IAuthScanner,
      undefined
    >({
      query: ({ password, eventId, device_name }) => ({
        url: `/auth`,
        method: "POST",
        data: {
          password: password,
          event_id: eventId,
          device_name: device_name,
        },
      }),
      invalidatesTags: ["Scanner"],
    }),
  }),
});

export const { useAuthScannerMutation } = scannerApiSlice;
