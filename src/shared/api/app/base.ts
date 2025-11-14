import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// Use /api proxy in browser to avoid CORS, fallback to direct URL if needed
export const API_URL =
  typeof window !== "undefined"
    ? "/api"
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Add request interceptor to dynamically set authorization header
    this.axios.interceptors.request.use(
      (config) => {
        // Only access localStorage in browser environment
        if (typeof window !== "undefined") {
          const sid = localStorage.getItem("sid");
          if (sid) {
            config.headers.Authorization = `TMA ${sid}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(
        endpoint,
        data,
        options,
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(
      endpoint,
      data,
      options,
    );
    return response.data;
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(
      endpoint,
      options,
    );
    return response.data;
  }

  async request<T>(options: AxiosBaseQueryArgs): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.request(options);
    return response.data;
  }
}

export const apiInstance = new ApiInstance();
