import type { ITicket } from "@/entities/ticket/model/types";

export interface IInvite {
  id: string;
  eventId: string;
  tickets: ITicket[];
}

export interface ICreateInvitationTicket {
  product_id: string;
  quantity: number;
}

export interface ICreateInvitePayload {
  event_id: string;
  included_products: ICreateInvitationTicket[];
  max_uses: number;
  valid_from: Date | null;
  valid_until: Date | null;
}
