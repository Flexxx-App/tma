import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { IAuthScanner } from "@/entities/scanner/model/types";

export const scannerApiSlice = createApi({
  reducerPath: "scannerApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/scanner" }),
  tagTypes: ["Scanner"],
  endpoints: (builder) => ({
    authScanner: builder.mutation<void, IAuthScanner, undefined>({
      query: ({ password }) => ({
        url: `/auth`,
        method: "POST",
        data: { password: password },
      }),
      invalidatesTags: ["Scanner"],
    }),
  }),
});

export const { useAuthScannerMutation } = scannerApiSlice;
