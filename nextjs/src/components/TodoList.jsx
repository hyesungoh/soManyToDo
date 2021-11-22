import useGetTodos from "../hooks/useGetTodos";

function TodoList() {
  const { data, error } = useGetTodos();

  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ul>
      {data.records.map((todo) => (
        <li key={todo.id}>{todo.fields.name}</li>
      ))}
    </ul>
  );
}

export default TodoList;
