export interface IPass {
  id: string;
  name: string;
  quantity: number;
  created_at: string;
  valid_from: string;
  valid_until: string;
  status: string;
  acquisition_type: string;
}

export interface IGuest {
  id: string;
  fullname: string;
  avatar_url: string;
  age: number;
  username: string;
  gender: "male" | "female";
  status: "active" | "scanned" | "queued";
  created_at: string;
  products: [
    {
      id: string;
      name: string;
      quantity: number;
      image_url?: string;
    },
  ];
  passes: IPass[];
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
