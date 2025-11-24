export interface IGuest {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  status: "active" | "scanned" | "queued";
  createdAt: string;
}

export interface IGuestsResponse {
  data: IGuest[];
  total: {
    all: number;
    inside: number;
    in_queue: number;
    incoming: number;
  };
}
