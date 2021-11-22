import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

function useGetTodos() {
  const { data } = useSWR("/todo", fetcher);

  return { data };
}

export default useGetTodos;
