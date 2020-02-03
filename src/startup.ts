// importing npm modules
import electron from "electron";
import { app, BrowserWindow } from "electron";
import fs from "fs";

// importing local modules
import { RadonWindowManager, RadonWindow } from "./components/RadonWindow";

import StartupResource from "../temp/old/startupResource";
import * as actions from "./const/actionTypes";

// imports routes
import * as Routes from "./routes";

const windowManager = new RadonWindowManager();

function setupWindows() {
  windowManager
    .createWindow("startup", {
      width: 400,
      height: 400,
      frame: false,
      resizable: false,
      center: true,
      movable: true, //false,
      minimizable: true,
      maximizable: false,
      alwaysOnTop: true,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    .bind(Routes.Startup)
    .apply();

  windowManager
    .createWindow("projectSetup", {
      width: 800,
      height: 600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    .bind(Routes.ProjectSetup)
    .apply();

  windowManager
    .createWindow("editorMain", {
      width: 1280,
      height: 900,
      resizable: true,
      maximizable: true,
      minimizable: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
    .bind(Routes.EditorMain)
    .apply();

  windowManager
    .createWindow("dev", {
      width: 1000,
      height: 800,
      frame: false,
      resizable: true,
      maximizable: true,
      minimizable: true,
      webPreferences: {
        nodeIntegration: true
      }
    })
    .bind(Routes.Dev)
    .apply();
}

function radonStartup() {
  const winStartup = windowManager.getRegisteredWindow("startup");
  if (winStartup) {
    winStartup.setActive(true);
    //        winStartup.native.webContents.openDevTools();
    //        winStartup.native.webContents.executeJavaScript(`document.querySelector('.display-text').appendChild(document.createTextNode('${res.getLoadableItem('user-prefs').text}'))`);
  }

  /*   const winDev = windowManager.getRegisteredWindow('dev');
    if (winDev)
    {
        winDev.setActive(true);
        winDev.native.webContents.openDevTools();
    } */
}

app.on("ready", radonStartup);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (windowManager.registeredWindows.length === 0) {
    radonStartup();
  }
});
