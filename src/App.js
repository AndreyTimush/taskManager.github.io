import { useState } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";
import RemoveAll from "./RemoveAll";

function App() {
  const [todos, setTodos] = useState([]);
  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        task: userInput,
        complete: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeAllTasks = (e) => {
    e.preventDefault();
    let list = [];
    console.log(123);
    setTodos([]);
  };

  return (
    <div className="App">
      <header>
        <h1>Task manager</h1>
      </header>
      <ToDoForm addTask={addTask} />
      <RemoveAll removeAllTasks={removeAllTasks} />
      {todos.map((todo) => {
        return <ToDo todo={todo} key={todo.id} />;
      })}
    </div>
  );
}

export default App;
