function ToDo({ todo, checkDate }) {
  return (
    <div>
      <div>
        <li
          className="list-group-item align-items-center flex-wrap mt-2"
          style={{ backgroundColor: checkDate(todo) }}
          // style={{ backgroundColor: { checkDate } ? "lightgreen" : "green" }}
        >
          <span>{todo.task}</span>
          <p>{todo.date}</p>
        </li>
      </div>
    </div>
  );
}

export default ToDo;
