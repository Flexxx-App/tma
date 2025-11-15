export type UserStatusEnum = "active" | "inactive" | "banned"; // You may adjust the possible statuses
export type UserGenderEnum = "male" | "female" | "other"; // You may adjust the possible genders

export interface IUser {
  id: string;
  email: string;
  phone: string;
  created_at: string; // ISO date string
  status: UserStatusEnum;
  first_name: string;
  last_name: string;
  age: number;
  username: string;
  gender: UserGenderEnum;
  avatar_url?: string | null;
}

export interface IUserUpdate {
  first_name?: string;
  last_name?: string;
  username?: string;
  gender?: UserGenderEnum;
  avatar_url?: string | null;
}
