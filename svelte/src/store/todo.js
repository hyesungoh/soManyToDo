import { writable } from "svelte/store";
import { get } from "../api";

function todoAction() {
  const { subscribe, set, update } = writable([]);

  const refreshTodo = async () => {
    console.log("asdf");
    const response = await get("/todo");
    console.log(response);
  };

  return { subscribe, refreshTodo };
}

export const todo = todoAction();
