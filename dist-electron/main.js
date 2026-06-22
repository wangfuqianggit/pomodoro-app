import { createRequire } from "node:module";
import { BrowserWindow, Menu, Tray, app, ipcMain, nativeImage } from "electron";
import path from "path";
//#region \0rolldown/runtime.js
var __require = /* @__PURE__ */ createRequire(import.meta.url);
//#endregion
//#region electron/main.ts
var mainWindow = null;
var tray = null;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 420,
		height: 700,
		minWidth: 380,
		minHeight: 600,
		resizable: true,
		frame: true,
		titleBarStyle: "hiddenInset",
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false
		}
	});
	if (process.env.VITE_DEV_SERVER_URL) mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
	else mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
}
function createTray() {
	tray = new Tray(nativeImage.createFromBuffer(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOElEQVQ4y2P4z8BQz0BAwMDAwPAfCkGMehBbAcpm+P///38GJgYGhv942PUMDAz/4WwGBgYATUQTC5n+g9sAAAAASUVORK5CYII=", "base64")));
	tray.setToolTip("Pomodoro Timer");
	const contextMenu = Menu.buildFromTemplate([{
		label: "Show",
		click: () => mainWindow?.show()
	}, {
		label: "Quit",
		click: () => app.quit()
	}]);
	tray.setContextMenu(contextMenu);
}
ipcMain.on("show-notification", (_event, { title, body }) => {
	if (mainWindow) {
		const { Notification } = __require("electron");
		new Notification({
			title,
			body,
			silent: true
		}).show();
	}
});
ipcMain.on("minimize-to-tray", () => {
	mainWindow?.hide();
});
app.whenReady().then(() => {
	createWindow();
	createTray();
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
//#endregion
export {};
