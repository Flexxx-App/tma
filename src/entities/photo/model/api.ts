import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/shared/api/app";
import axios from "axios";

export const photoApiSlice = createApi({
  reducerPath: "photoApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/photo`,
  }),
  tagTypes: ["Photo"],
  endpoints: (builder) => ({
    presignUrl: builder.mutation<
      { url: string; filename: string },
      { file: File; filename?: string }
    >({
      async queryFn(
        payload,
        api,
      ): Promise<
        | { data: { url: string; filename: string } }
        | { error: { message: string } }
      > {
        try {
          const state = api.getState() as { auth?: { token?: string } };
          const token = state?.auth?.token;

          const filename = payload.filename ?? payload.file.name;

          // 1) Ask backend for a presigned POST
          const presignRes = await axios.post(
            `/api/proxy/photo/presign-object?file_name=${filename}`,
            undefined,
            {
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              validateStatus: () => true, // allow manual error handling
            },
          );

          if (presignRes.status < 200 || presignRes.status >= 300) {
            const message =
              presignRes.data && typeof presignRes.data === "string"
                ? presignRes.data
                : "Failed to presign";
            return { error: { message } };
          }

          const raw: unknown = presignRes.data;

          const isRecord = (val: unknown): val is Record<string, unknown> =>
            typeof val === "object" && val !== null;

          const isFields = (val: unknown): val is Record<string, string> => {
            if (!isRecord(val)) return false;
            return Object.values(val).every((v) => typeof v === "string");
          };

          type PresignRequest = { url: string; fields: Record<string, string> };
          const isPresignRequest = (val: unknown): val is PresignRequest => {
            return (
              isRecord(val) &&
              typeof val.url === "string" &&
              isFields(val.fields)
            );
          };

          const normalize = (
            data: unknown,
          ): { request: PresignRequest; publicUrl: string } | null => {
            if (!isRecord(data)) return null;
            // Case A: { presigned_object: { request, public_object_url|public_url } }
            if ("presigned_object" in data && isRecord(data.presigned_object)) {
              const po = data.presigned_object as Record<string, unknown>;
              const requestVal = po.request;
              const publicUrlVal =
                (po.public_object_url as unknown) ?? (po.public_url as unknown);
              if (
                isPresignRequest(requestVal) &&
                typeof publicUrlVal === "string"
              ) {
                return { request: requestVal, publicUrl: publicUrlVal };
              }
            }
            // Case B: { request, public_object_url|public_url }
            const requestVal = (data as Record<string, unknown>).request;
            const publicUrlVal =
              (data as Record<string, unknown>).public_object_url ??
              (data as Record<string, unknown>).public_url;
            if (
              isPresignRequest(requestVal) &&
              typeof publicUrlVal === "string"
            ) {
              return { request: requestVal, publicUrl: publicUrlVal };
            }
            return null;
          };

          const normalized = normalize(raw);
          if (!normalized) {
            return { error: { message: "Invalid presign response" } };
          }

          // 2) Upload file directly to S3 using the presigned POST
          const formData = new FormData();
          Object.entries(normalized.request.fields).forEach(([k, v]) => {
            formData.append(k, v);
          });
          formData.append("file", payload.file);

          const s3UploadRes = await axios.post(
            normalized.request.url,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              validateStatus: () => true, // allow manual error handling
            },
          );

          if (s3UploadRes.status < 200 || s3UploadRes.status >= 300) {
            const message =
              s3UploadRes.data && typeof s3UploadRes.data === "string"
                ? s3UploadRes.data
                : "Failed to upload to S3";
            return { error: { message } };
          }

          // 3) Return public URL from backend response
          return {
            data: {
              url: normalized.publicUrl,
              filename,
            },
          };
        } catch (error: unknown) {
          return {
            error: {
              message: error instanceof Error ? error.message : "upload error",
            },
          };
        }
      },
      invalidatesTags: ["Photo"],
    }),
  }),
});

export const { usePresignUrlMutation } = photoApiSlice;
