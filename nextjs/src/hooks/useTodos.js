import useSWR from "swr";
import { del, post } from "../lib/api";
import { fetcher } from "../lib/fetcher";

function useTodos() {
  const { data, error, mutate } = useSWR("/todo", fetcher);

  async function createTodo(todoString) {
    await post("/todo", { fields: { name: todoString } });
    mutate({ ...data, fields: { name: todoString } });
  }

  async function deleteTodo(todoId) {
    await del(`/todo/${todoId}`);
    mutate();
  }

  return { data, error, createTodo, deleteTodo };
}

export default useTodos;
