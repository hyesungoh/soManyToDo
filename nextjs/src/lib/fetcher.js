import { get } from "./api";

export const fetcher = async (path) => {
  const response = await get(path);
  return response;
};
