const { contextBridge, ipcRenderer } = require("electron");
const os = require("node:os");
const fs = require("fs");

contextBridge.exposeInMainWorld("electron", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("todos", {
  getTodos: (callback) => {
    ipcRenderer.send("get-todos");
    ipcRenderer.on("get-todos", (event, data) => callback(data));
  },
  setTodo: (todo) => ipcRenderer.send("set-todo", todo),
  clearTodos: () => ipcRenderer.send("clear-todos"),
  deleteTodo: (id) => ipcRenderer.send("delete-todo", id),
});
