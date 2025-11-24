import type { ITicket } from "@/entities/ticket/model/types";

export interface IInvite {
  id: string;
  eventId: string;
  tickets: ITicket[];
}

export interface ICreateInvitePayload {
  eventId: string;
  ticketIds: string[];
}


