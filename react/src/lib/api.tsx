import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/app5AO0SumKR9cNKp",
});

const requestInterceptor = (config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});

instance.interceptors.request.use(requestInterceptor);

export const get = <T,>(...args: Parameters<typeof instance.get>) =>
  instance.get<T, T>(...args);

export const post = <T,>(...args: Parameters<typeof instance.post>) =>
  instance.post<T, T>(...args);

export const del = <T,>(...args: Parameters<typeof instance.delete>) =>
  instance.delete<T, T>(...args);
