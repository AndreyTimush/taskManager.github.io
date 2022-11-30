import { useState } from "react";

function ToDoForm({ addTask, removeAllTasks }) {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputTask">Add new task</label>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          className="form-control"
          id="inputTask"
          placeholder="Max length 240"
          maxLength="240"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Add task
      </button>
      <button
        onClick={removeAllTasks}
        type="reset"
        className="btn btn-danger mt-4 float-end"
      >
        Remove all tasks
      </button>
    </form>
  );
}

export default ToDoForm;
