export interface IPass {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  status: "active" | "scanned";
  createdAt: string;
  secret: string;
}
