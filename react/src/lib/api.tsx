import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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

const responseFulfilledInterceptor = (res: AxiosResponse) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

const responseRejectedInterceptor = (error: AxiosError) => {
  if (error.response?.data.message != null) {
    return {
      ...error.response.data,
      message: error.response.data.message,
    };
  }

  return new Error(error.response?.data.message ?? error);
};

instance.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectedInterceptor
);

export const get = <T,>(...args: Parameters<typeof instance.get>) =>
  instance.get<T, T>(...args);

export const post = <T,>(...args: Parameters<typeof instance.post>) =>
  instance.post<T, T>(...args);

export const del = <T,>(...args: Parameters<typeof instance.delete>) =>
  instance.delete<T, T>(...args);
