import { useState, useContext, useEffect } from "react";
import React from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";
import Upload from "./Upload";

function generateId() {
  const id = (Math.random() + new Date().getTime()) * 10000;
  return id;
}

const initialTasks = [
  {
    id: generateId(),
    text: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    date: "28.10.2022",
  },
  {
    id: generateId(),
    text: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    date: "21.10.2022",
  },
  {
    id: generateId(),
    text: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    date: "22.10.2022",
  },
  {
    id: generateId(),
    text: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
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
  const [tasks, setTask] = useState(initialTasks);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: generateId(),
        text: userInput,
        date: generateDate(),
      };
      setTask([...tasks, newItem]);
    }
  };

  const addTaskFromFile = (arr) => {
    const newArr = arr.map((element) => {
      return {
        id: generateId(),
        text: element.text,
        date: element.date,
      };
    });
    setTask([...tasks, ...newArr]);
  };

  function generateDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const month = currentDate.getMonth() + 1;
    const date =
      currentDate.getDate() + "." + month + "." + currentDate.getFullYear();

    return date;
  }

  const removeAllTasks = () => {
    setTask([]);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <div className="card">
                <div className="card-body">
                  <ToDoForm addTask={addTask} removeAllTasks={removeAllTasks} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Upload addTaskFromFile={addTaskFromFile} />

        <div className="tasks-list-section mt-2">
          <div className="container">
            <ul className="list-group">
              {tasks.map((todo) => {
                return <ToDo todo={todo} key={todo.id} />;
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
