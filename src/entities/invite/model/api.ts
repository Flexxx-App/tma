import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type {
  ICreateInvitePayload,
  IInvite,
} from "@/entities/invite/model/types";

export const inviteApiSlice = createApi({
  reducerPath: "inviteApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/invites" }),
  tagTypes: ["Invite"],
  endpoints: (builder) => ({
    getInvite: builder.query<IInvite, string, undefined>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Invite" as const, id },
      ],
    }),
    createInvite: builder.mutation<IInvite, ICreateInvitePayload, undefined>({
      query: ({ eventId, ticketIds }) => ({
        url: `/`,
        method: "POST",
        data: {
          event_id: eventId,
          ticket_ids: ticketIds,
        },
      }),
      invalidatesTags: ["Invite"],
    }),
  }),
});

export const { useGetInviteQuery, useCreateInviteMutation } = inviteApiSlice;


