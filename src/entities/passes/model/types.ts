export interface IPass {
  id: string;
  guest_id: string;
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
