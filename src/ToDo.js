function ToDo({ todo }) {
  const returnColor = (todo) => {
    const date = todo.date;
    const str = date.split(".");
    const month = Number(str[1] - 1);
    const dateTask = new Date(str[2], month, str[0]);
    const nowDate = new Date();
    if (dateTask < nowDate) {
      return "pink";
    }
    return "";
  };

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
