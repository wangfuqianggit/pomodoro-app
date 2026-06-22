import { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 700,
    minWidth: 380,
    minHeight: 600,
    resizable: true,
    frame: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

function createTray() {
  // Create a simple 16x16 icon programmatically
  const icon = nativeImage.createFromBuffer(
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOElEQVQ4y2P4z8BQz0BAwMDAwPAfCkGMehBbAcpm+P///38GJgYGhv942PUMDAz/4WwGBgYATUQTC5n+g9sAAAAASUVORK5CYII=',
      'base64'
    )
  )
  tray = new Tray(icon)
  tray.setToolTip('Pomodoro Timer')

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow?.show() },
    { label: 'Quit', click: () => app.quit() },
  ])
  tray.setContextMenu(contextMenu)
}

// IPC handlers
ipcMain.on('show-notification', (_event, { title, body }) => {
  if (mainWindow) {
    const { Notification } = require('electron')
    const notification = new Notification({ title, body, silent: true })
    notification.show()
  }
})

ipcMain.on('minimize-to-tray', () => {
  mainWindow?.hide()
})

app.whenReady().then(() => {
  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
