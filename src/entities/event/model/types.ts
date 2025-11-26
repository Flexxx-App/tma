import type {
  IOrganization,
  OrganizationTypeEnum,
} from "@/entities/organization/model/types";

export type SpecialGuestTypeEnum = "artist" | "celebrity" | "other";
export type GalleryVisibilityEnum = "public" | "private";
export type EventOrganizerRoleEnum = "owner" | "co_organizer" | "partner";
export type EventTypeEnum = "club" | "festival" | "concert";
export type EventVisibilityEnum = "public" | "private" | "link";
export type TicketSaleViewEnum = "default" | "hidden" | "custom";
export type EventStatusEnum = "draft" | "published" | "cancelled" | "archived";
export type EventAccessTypeEnum = "rsvp" | "ticket";
export type VenueFormatEnum = "indoor" | "outdoor" | "hybrid";
export type UUID = string;
export type Decimal = string;

export interface IArtist {
  id: number;
  name: string;
  photo_url: string | null;
  music_url: string | null;
  is_secret: boolean;
}

export interface ISpecialGuest {
  id: UUID;
  name: string;
  photo_url: string;
  type: SpecialGuestTypeEnum;
  description: string | null;
}

export interface IGalleryImage {
  id: UUID;
  photo_url: string;
}

export interface IGallery {
  id: UUID;
  photos: IGalleryImage[];
}

export interface ICoordinates {
  latitude: Decimal;
  longitude: Decimal;
}

export interface IEventVenue {
  id: UUID;
  name: string | null;
  address: string | null;
  city: string;
  country: string;
  format: VenueFormatEnum;
  coordinates: ICoordinates | null;
  capacity: number | null;
}

export interface IEventSettings {
  event_id: UUID;
  service_fee_percentage: Decimal;
  currency: string;
}

export interface IOrganizer {
  id: UUID;
  owner_id: UUID;
  name: string;
  avatar_url: string;
  created_at: string;
  description: string | null;
  links: string | null;
}

export interface IEventHost {
  id: UUID;
  organization: IOrganization;
  role: EventOrganizerRoleEnum;
  type: OrganizationTypeEnum;
  custom_name: null;
  custom_social_url: null;
  custom_image_url: null;
}

export interface IFeature {
  id: UUID;
  name: string;
  description: string | null;
  image_url: string | null;
}

export interface IRestriction {
  id: UUID;
  name: string;
}

export interface IFastAnswerQuestion {
  id: UUID;
  question: string;
  answer: string;
}

export interface IEventTerm {
  id: UUID;
  description: string;
}

export interface IEventSearchResult {
  id: UUID;
  name: string;
  description: string | null;
  access_type: EventAccessTypeEnum;
}

export interface IEventWidgets {
  show_guestlist: boolean;
  show_guests_count: boolean;
}

export interface IRsvp {
  max_rsvps: number | null;
  max_attendee_count: number;
  approval_status: ApprovalStatusEnum;
}

export interface ISchedule {
  scheduled_for: string;
  pre_signup_status: PreSignupStatusEnum;
}

export interface IEvent {
  id: UUID;
  name: string;
  description: string | null;
  slug: string;
  created_at: string;
  poster_url: string | null;
  preview_video_url: string | null;
  dress_code: string | null;
  min_age: number;
  type: EventTypeEnum;
  currency_code: string;
  doors_open_at: string | null;
  visibility: EventVisibilityEnum;
  starts_at: string;
  ends_at: string;
  organizers: IEventHost[];
  line_up: IArtist[] | null;
  sale_view: TicketSaleViewEnum;
  event_venue: IEventVenue;
  playlist_url: string | null;
  guides: IGuides[] | null;
  status: EventStatusEnum;
  rsvp: IRsvp | null;
  schedule: ISchedule | null;
  access_type: EventAccessTypeEnum;
  gallery: IGallery | null;
  features: IFeature[] | null;
  restrictions: IRestriction[] | null;
  faqs: IFastAnswerQuestion[] | null;
  terms: IEventTerm[] | null;
}

export interface IEventsListResponse {
  events: IEvent[];
  total: number;
}

export interface ISlugEvent {
  id: UUID;
  name: string;
  description: string | null;
  created_at: string;
  poster_url: string | null;
  preview_video_url: string | null;
  type: EventTypeEnum;
  visibility: EventVisibilityEnum;
  starts_at: string;
  ends_at: string;
  hosts: IEventHost[];
  line_up: IArtist[] | null;
  sale_view: TicketSaleViewEnum;
  event_venue: IEventVenue;
  song_url: string | null;
  status: EventStatusEnum;
  access_type: EventAccessTypeEnum;
  gallery: IGallery | null;
  features: IFeature[] | null;
  restrictions: IRestriction[] | null;
  faqs: IFastAnswerQuestion[] | null;
  terms: IEventTerm[] | null;
  widgets: IEventWidgets;
  guides: IGuides[] | null;
}

export interface IEventPreview {
  event_id: UUID;
  name: string;
  release_date: string | null;
  poster_url: string | null;
}

export interface IApiEventResponse {
  event: ISlugEvent | null;
  preview: IEventPreview | null;
  pre_signup: boolean;
}

export interface ICollaborator {
  organization_id: UUID;
}

export type PreSignupStatusEnum = "enabled" | "disabled";
export type EventVenueTypeEnum = "existing" | "custom";
export type EventVenueStatusEnum = "secret" | "public" | "unknown";
export type ApprovalStatusEnum = "required" | "disabled";

export interface ICustomVenue {
  name: string;
  lat: Decimal;
  lon: Decimal;
  address: string;
  capacity: number;
  has_parking: boolean;
  format: VenueFormatEnum;
  type: EventVenueTypeEnum;
}

export interface IWidgetsSettings {
  show_guestlist: boolean;
  show_guests_count: boolean;
}

export interface IGuides {
  icon: string;
  name: string;
  value: string;
}
