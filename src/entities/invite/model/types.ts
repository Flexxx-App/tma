import type { ITicket } from "@/entities/ticket/model/types";
import type { UUID } from "crypto";

export interface IInvitationUse {
  id: UUID;
  created_at: string;
  used_at: string | null;
  user_id: UUID;
}

export interface IInvite {
  id: UUID;
  created_at: string;
  event_id: UUID;
  max_uses: number;
  included_products: ICreateInvitationTicket[];
  valid_from: string | null;
  valid_until: string | null;
  uses: IInvitationUse[] | null;
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
