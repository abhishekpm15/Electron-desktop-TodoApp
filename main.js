const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron/main");
const path = require("node:path");
const fs = require("fs");

const userDataPath = app.getPath("userData");
const todosFilePath = path.join(userDataPath, "todos.json");

console.log("User data path:", userDataPath);
console.log("Todos file path:", todosFilePath);

function createFile() {
  try {
    if (!fs.existsSync(todosFilePath)) {
      fs.writeFileSync(todosFilePath, "", { mode: 0o600 });
      console.log("todos.json file created with default content.");
    } else {
      console.log("todos.json file already exists.");
    }
  } catch (error) {
    console.error("Error creating todos.json:", error);
  }
}

function setFilePermissions() {
  try {
    fs.chmodSync(todosFilePath, 0o600);
    console.log("Permissions set for todos.json.");
  } catch (error) {
    console.error("Error setting permissions for todos.json:", error);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  const indexPath = path.join(__dirname, "./app/build/index.html");
  win.loadFile(indexPath);
}

app.whenReady().then(() => {
  createFile();
  setFilePermissions();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("set-todo", (event, todo) => {
  fs.appendFile(todosFilePath, todo + ",", (err) => {
    if (err) {
      console.error("Error appending to todos.json:", err);
      return;
    }
    console.log("Todo saved.");
    fs.readFile(todosFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading todos.json:", err);
        return;
      }
      event.reply("get-todos", data);
    });
  });
});

ipcMain.on("get-todos", (event) => {
  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos.json:", err);
      return;
    }
    event.reply("get-todos", data);
  });
});

ipcMain.on("clear-todos", (event) => {
  fs.writeFile(todosFilePath, "", (err) => {
    if (err) {
      console.error("Error clearing todos.json:", err);
      return;
    }
    console.log("Todos cleared.");
    event.reply("get-todos", "");
  });
});

ipcMain.on("delete-todo", (event, id) => {
  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos.json:", err);
      return;
    }
    let parsedData = data.substring(0, data.length - 1).split(",");
    if (parsedData.length === 1) {
      fs.writeFile(todosFilePath, "", (err) => {
        if (err) {
          console.error("Error clearing todos.json:", err);
          return;
        }
        event.reply("get-todos", "");
      });
    } else {
      parsedData.splice(id, 1);
      let updatedData = parsedData.join(",");
      fs.writeFile(todosFilePath, updatedData + ",", (err) => {
        if (err) {
          console.error("Error writing to todos.json:", err);
          return;
        }
        event.reply("get-todos", updatedData);
      });
    }
  });
});
