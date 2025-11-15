import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export const API_URL = "/api/proxy";

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
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type,Cookie,Authorization,X-TMA",
        "Access-Control-Max-Age": "86400",
      },
      withCredentials: true,
    });
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
