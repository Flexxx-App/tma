import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import { IUser, IUserUpdate } from "@/entities/user/model/types";
import { OnboardingFormData } from "@/pages/(onboarding)/ui/oboarding-page";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/users",
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
    updateMe: builder.mutation<IUser, IUserUpdate, { tagTypes: string[] }>({
      query: (data) => ({
        url: `/`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    completeOnboarding: builder.mutation<
      IUser,
      OnboardingFormData,
      { tagTypes: string[] }
    >({
      query: (data) => ({
        url: `/complete`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useCompleteOnboardingMutation,
} = userApiSlice;
