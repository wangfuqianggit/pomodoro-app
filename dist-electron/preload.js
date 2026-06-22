import { contextBridge, ipcRenderer } from "electron";
//#region electron/preload.ts
contextBridge.exposeInMainWorld("electronAPI", {
	showNotification: (title, body) => {
		ipcRenderer.send("show-notification", {
			title,
			body
		});
	},
	minimizeToTray: () => {
		ipcRenderer.send("minimize-to-tray");
	}
});
//#endregion
export {};
