import { get, post, del } from "../lib/api";

function useTodos() {
  const getTodos = async () => {
    const response = await get("/todo");
    console.log(response);
  };

  return { getTodos };
}

export default useTodos;
