import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { IUser } from "@/entities/user/model/types";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl:
      typeof window !== "undefined"
        ? "/users"
        : `${process.env.NEXT_PUBLIC_API_URL}/users`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void, { tagTypes: string[] }>({
      query: () => ({
        url: `/me`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery } = userApiSlice;
