import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import type {
  ICreateInvitePayload,
  IInvite,
} from "@/entities/invite/model/types";

export const inviteApiSlice = createApi({
  reducerPath: "inviteApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/invitations" }),
  tagTypes: ["Invite"],
  endpoints: (builder) => ({
    getInvite: builder.query<IInvite, string, undefined>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Invite" as const, id }],
    }),
    createInvite: builder.mutation<IInvite, ICreateInvitePayload, undefined>({
      query: ({
        event_id,
        included_products,
        max_uses,
        valid_from,
        valid_until,
      }) => ({
        url: `/`,
        method: "POST",
        data: {
          event_id,
          included_products: included_products.map((product) => ({
            ticket_id: product.product_id,
            quantity: product.quantity,
          })),
          max_uses,
          valid_from,
          valid_until,
        },
      }),
      invalidatesTags: ["Invite"],
    }),
  }),
});

export const { useGetInviteQuery, useCreateInviteMutation } = inviteApiSlice;
