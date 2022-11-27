function ToDo({ todo }) {
  return (
    <div key={todo.id} className="item-todo">
      <div>{todo.task}</div>
    </div>
  );
}

export default ToDo;
