import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

function useGetTodos() {
  const { data, error } = useSWR("/todo", fetcher);

  return { data, error };
}

export default useGetTodos;
