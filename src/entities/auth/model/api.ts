import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { ITmaAuthResponse } from "@/entities/auth/model/types";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/auth" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    tmaAuth: builder.mutation<
      ITmaAuthResponse,
      { initData: string },
      undefined
    >({
      query: ({ initData }: { initData: string }) => ({
        url: `/tma`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-TMA": `TMA ${initData}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useTmaAuthMutation } = authApiSlice;
