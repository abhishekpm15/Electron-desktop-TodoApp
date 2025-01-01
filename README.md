# Todo-App

A simple Todo application built using Electron.js. This app allows users to manage their daily tasks in a lightweight, desktop-based application.

<img width="1470" alt="Screenshot 2025-01-01 at 9 05 35 PM" src="https://github.com/user-attachments/assets/7aef90fe-1891-4175-a8f0-799883b6a936" />

# Features

🚀 Add Tasks. \
🚀 Remove particular tasks. \
🚀 Remove all Tasks.

# Getting Started 
## 1. Renderer part

```
git clone https://github.com/abhishekpm15/Electron-desktop-TodoApp.git
cd app
npm install 
```
## 2. Main process 
### Back to notes-app folder

```
npm install
```

### 🔴 Ensure index.html file inside build folder has to be loaded in the indexPath of main.js


## 3. Package 

### use "electron-packager" to package the app for the corresponding OS [npm electron-packager](https://www.npmjs.com/package/electron-packager/v/8.0.0)

### Commands to Build and deploy app
#### --platform=win32  --arch=x64 (windows)
#### --platform=darwin --arch=x64 (macOS Intel Apple Silicon)
#### --platform=darwin --arch=arm64 (macOS Apple Silicon arm64)
#### --platform=linux  --arch=x64 (linux)

```
electron-packager . Todo-App --platform=win32 --arch=x64 --asar --out=dist/
```

##### ASAR (Atom Shell Archive) is a file format used by Electron to package the source code and assets of an application into a single archive file


## 4. Execution
### Head to the generated executable file and start the application.
