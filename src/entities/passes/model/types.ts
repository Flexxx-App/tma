import { UUID } from "crypto";

export interface IPass {
  id: string;
  guest_id: string;
  name: string;
  created_at: string;
  totp_secret: string;
  valid_from: string | null;
  valid_until: string | null;
  status: string;
  acquisition_type: string;
}

export interface IPassesResponse {
  passes: IPass[];
  total: number;
}

export interface IScanPassResponse {
  pass_data?: IPass;
  guest?: {
    id: UUID;
    user_id: UUID;
    avatar_url: string | null;
    fullname: string;
    type: string;
    event_id: UUID;
    status: string;
    created_at: string;
  };
  ticket?: {
    id: string;
    name: string;
    description?: string | null;
  };
  event?: {
    id: string;
    name: string;
  };
}
