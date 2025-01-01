import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import DeleteButton from "./assets/delete.svg";
import { ToastContainer } from "react-toastify";

function App() {
  const ipcTodos = window.todos;
  const [todos, setTodos] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    ipcTodos.getTodos((data) => {
      console.log("data ", data.length);
      console.log("todo", data);
      if (data.length > 0) {
        console.log("data ", data);
        let parsedData = data.substring(0, data.length).split(",");
        console.log("parsedData ", parsedData);
        const convertedParsedData = parsedData
          .map((item, index) => {
            if (item !== "")
              return {
                id: index,
                item: item,
              };
            return null;
          })
          .filter((item) => item !== null);
        setTodos(convertedParsedData);
      } else setTodos([]);
    });
  }, [ipcTodos]);

  useEffect(() => {
    if (deleteAll) {
      ipcTodos.clearTodos();
      setTodos([]);
      setDeleteAll(false);
    }
  }, [deleteAll, ipcTodos]);

  const deleteTodoButton = (id) => {
    // event.preventDefault();
    ipcTodos.deleteTodo(id);
  };

  return (
    <div className="App text-2xl min-h-screen ">
      <ToastContainer />
      <Navbar />
      <div className="flex justify-center mt-10 font-serif">
        <Header />
      </div>
      <div className="flex justify-center items-center mt-20">
        <Input
          todos={todos}
          setTodos={setTodos}
          submit={submit}
          setSubmit={setSubmit}
          ipcTodos={ipcTodos}
          deleteAll={deleteAll}
          setDeleteAll={setDeleteAll}
        />
      </div>
      {todos.length > 0 && (
        <div className="mt-10">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-center items-center mt-7"
            >
              <div className="bg-gray-300 p-2 rounded-md w-2/3 text-black">
                {todo.item}
              </div>
              <div
                className="flex items-center ml-3 rounded-lg bg-white p-1"
                onClick={(e) => {
                  deleteTodoButton(todo.id);
                }}
              >
                <img
                  src={DeleteButton}
                  alt="delete button"
                  className="w-8 h-8"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
