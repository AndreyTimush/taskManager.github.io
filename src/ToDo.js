function ToDo({ todo, returnColor }) {
  return (
    <div>
      <div>
        <li
          className="list-group-item align-items-center flex-wrap mt-2"
          style={{ backgroundColor: returnColor(todo) }}
        >
          <span>{todo.text}</span>
          <p>{todo.date}</p>
        </li>
      </div>
    </div>
  );
}

export default ToDo;
