import useTodos from "../hooks/useTodos";

function TodoList() {
  const { data, error, deleteTodo } = useTodos();

  function onClickDelete(e) {
    const { id } = e.currentTarget.parentNode;
    deleteTodo(id);
  }

  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ul>
      {data.records.map((todo) => (
        <li key={todo.id} id={todo.id}>
          {todo.fields.name}
          <button onClick={onClickDelete}>X</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
