import { useState, useContext, useEffect } from "react";
import React from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";
import RemoveAll from "./RemoveAll";
import Upload from "./Upload";

const tasks = [
  {
    id: "5d2ca9e2e03d40b326596aa7",
    task: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    date: "28.10.2022",
  },
  {
    id: "5d2ca9e29c8a94095c1288e0",
    task: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    date: "21.10.2022",
  },
  {
    id: "5d2ca9e2e03d40b3232496aa7",
    task: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    date: "22.10.2022",
  },
  {
    id: "5d2ca9e29c8a94095564788e0",
    task: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    date: "23.10.2022",
  },
];

const PAGE_HOME = "/";
const PAGE_TASKS = "/tasks";

export const RouterContext = React.createContext({
  page: PAGE_HOME,
  setPage: (page) => page,
});

function App() {
  const [todos, setTodos] = useState(tasks);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        task: userInput,
        date: makeData(),
      };
      setTodos([...todos, newItem]);
    }
  };

  const addTaskFromFile = (arr) => {
    const newArr = arr.map((element) => {
      return {
        id: Math.random(),
        task: element.task,
        date: element.date,
      };
    });
    setTodos([...todos, ...newArr]);
  };

  const checkDate = (todo) => {
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

  function makeData() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const month = currentDate.getMonth() + 1;
    const date =
      currentDate.getDate() + "." + month + "." + currentDate.getFullYear();

    return date;
  }

  const removeAllTasks = () => {
    setTodos([]);
  };

  const routes = new Set([PAGE_HOME, PAGE_TASKS]);

  const getCurrentRoute = (location) => {
    if (routes.has(location)) {
      return location;
    }

    return PAGE_HOME;
  };

  const RouterProvider = ({ children }) => {
    const [page, setPage] = useState(getCurrentRoute(window.location.pathname));

    const performSetPage = (page) => {
      setPage(page);

      return page;
    };

    return (
      <RouterContext.Provider value={{ page, setPage: performSetPage }}>
        {children}
      </RouterContext.Provider>
    );
  };

  const useRouter = () => {
    const { page, setPage } = useContext(RouterContext);

    useEffect(() => {
      window.onpopstate = () => {
        setPage(document.location.pathname);
      };
    }, []);

    const pushPage = (page) => {
      window.history.pushState({}, "", page);
      setPage(page);
    };

    return { page, pushPage };
  };

  const HomePage = () => {
    const { pushPage } = useRouter();

    return (
      <div className="container text-center">
        <h1>Task manager</h1>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={() => pushPage(PAGE_TASKS)}
        >
          Task manager
        </button>
      </div>
    );
  };

  const PageResolver = () => {
    const { page } = useRouter();

    return (
      <div>
        {page === PAGE_HOME && <HomePage />}
        {page === PAGE_TASKS && <TasksPage />}
      </div>
    );
  };

  const TasksPage = () => {
    return (
      <div className="App">
        <header>
          <div className="container text-center">
            <h1>Task manager</h1>
          </div>
        </header>
        <div className="form-section mt-2">
          <div className="container">
            <div className="row">
              <div className="col col-3 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Add new task</h5>
                    <ToDoForm addTask={addTask} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RemoveAll removeAllTasks={removeAllTasks} />
        <Upload addTaskFromFile={addTaskFromFile} />

        <div className="tasks-list-section mt-2">
          <div className="container">
            <ul className="list-group">
              {todos.map((todo) => {
                return <ToDo todo={todo} key={todo.id} checkDate={checkDate} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <RouterProvider>
      <PageResolver />
    </RouterProvider>
  );
}

export default App;
