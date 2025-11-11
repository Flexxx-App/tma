export interface IGuest {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  status: "active" | "scanned" | "queued";
  createdAt: string;
}
