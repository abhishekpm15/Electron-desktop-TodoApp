import React, { useEffect, useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

const Input = ({
  todos,
  setTodos,
  submit,
  setSubmit,
  ipcTodos,
  setDeleteAll,
}) => {
  const [input, setInput] = useState("");

  const handleDeleteAll = () => {
    setDeleteAll(true);
  };

  const handleAddTodo = () => {
    if (input === "") {
      toast.error("Please enter a todo");
    } else {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (submit) {
      ipcTodos.setTodo(input);
      setInput("");
      setSubmit(false);
    }
  }, [todos, setTodos, ipcTodos, submit, input, setSubmit]);

  return (
    <div className="flex space-x-5 w-full justify-center">
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full min-w-xl"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
      </div>
      <Button type="add" handleAction={handleAddTodo} />
      <Button type="delete" handleAction={handleDeleteAll} />
    </div>
  );
};

export default Input;
