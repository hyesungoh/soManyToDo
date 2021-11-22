import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.airtable.com/v0/app5AO0SumKR9cNKp",
});

console.log(process.env.NEXT_PUBLIC_API_KEY);

const requestInterceptor = (config) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

instance.interceptors.request.use(requestInterceptor);

const responseFulfilledInterceptor = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

const responseRejectedInterceptor = (error) => {
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

export const get = (...args) => instance.get(...args);

export const post = (...args) => instance.post(...args);

export const del = (...args) => instance.delete(...args);
