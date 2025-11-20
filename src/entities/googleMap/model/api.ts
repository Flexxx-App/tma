import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export interface PlaceAutocompleteRequest {
  input: string;
  locationBias?: {
    circle: {
      center: {
        latitude: number;
        longitude: number;
      };
      radius: number;
    };
  };
}

export interface IPlacePrediction {
  placePrediction?: {
    place: string;
    placeId: string;
    text: {
      text: string;
      matches: Array<{
        endOffset: number;
        startOffset?: number;
      }>;
    };
    structuredFormat?: {
      mainText: {
        text: string;
        matches: Array<{
          endOffset: number;
          startOffset?: number;
        }>;
      };
      secondaryText: {
        text: string;
      };
    };
    types?: string[];
  };
  queryPrediction?: {
    text: {
      text: string;
      matches: Array<{
        endOffset: number;
        startOffset?: number;
      }>;
    };
  };
}

export interface PlaceAutocompletePrediction {
  suggestions: Array<IPlacePrediction>;
}

export interface IPlaceDetails {
  id: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timeZone: {
    id: string;
  };
  postalAddress: {
    regionCode: string;
    languageCode: string;
    postalCode: string;
    locality: string;
    addressLines: string[];
  };
  parkingOptions: {
    paidParking: boolean;
    valetParking: boolean;
  };
}

export const googlePlacesApiSlice = createApi({
  reducerPath: "googlePlacesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://places.googleapis.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("X-Goog-Api-Key", GOOGLE_MAPS_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    autocomplete: builder.mutation<
      PlaceAutocompletePrediction,
      PlaceAutocompleteRequest
    >({
      query: (body) => ({
        url: "places:autocomplete",
        method: "POST",
        body,
      }),
    }),
    placeDetails: builder.query<IPlaceDetails, string>({
      query: (placeId) => ({
        url: `places/${placeId}?key=${GOOGLE_MAPS_API_KEY}&languageCode=en-US`,
        method: "GET",
        headers: {
          "X-Goog-FieldMask":
            "id,formattedAddress,location,timeZone,postalAddress,parkingOptions",
        },
      }),
    }),
  }),
});

export const { useAutocompleteMutation, usePlaceDetailsQuery } =
  googlePlacesApiSlice;
