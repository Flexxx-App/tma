import { AxiosError, type AxiosRequestConfig } from "axios";
import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import { apiInstance } from "@/shared/api/app/base";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = {}): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    unknown
  > =>
  async <T>(
    args: AxiosBaseQueryArgs,
    api: any,
  ): Promise<{ data: T } | { error: { status: string; data: string } }> => {
    const { url, method = "get", data, params, headers } = args;

    try {
      const token = api.getState()?.auth?.token as string | undefined;

      const res = await apiInstance.request<T>({
        url: `${baseUrl ?? ""}${url}`,
        method,
        data,
        params,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
      });

      return { data: res };
    } catch (rawError) {
      const err = rawError as AxiosError;
      return {
        error: {
          status: err.response?.status?.toString() ?? "FETCH_ERROR",
          data: err.response?.data?.toString() ?? err.message,
        },
      };
    }
  };
