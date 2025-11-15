import type { IEvent } from "@/entities/event/model/types";

export type OrganizationTypeEnum = "community" | "venue";

export interface IOrganizationLinks {
  id: number;
  name: string;
  url: string;
}

export interface IOrganization {
  id: string;
  owner_id: string | null;
  name: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  country: string;
  description: string | null;
  links: IOrganizationLinks[] | null;
  type: OrganizationTypeEnum;
}

export interface IOrganizationEvents {
  events: IEvent[];
  total: number;
}

export interface IOrganizationSignup {
  name: string;
  username: string;
  avatar_url: string | null;
  description: string | null;
  type: OrganizationTypeEnum;
  country: string;
}

export interface IStripeDetails {
  details_submitted: boolean;
}
