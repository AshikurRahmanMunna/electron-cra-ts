// import { globalShortcut } from 'electron'

// import { app, BrowserWindow } from 'electron'
// import isDev from 'electron-is-dev'
// import path from 'path'

const { globalShortcut } = require('electron')

const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  })

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(url)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const handleDevTools = () => {
  const currentWindow = BrowserWindow.getFocusedWindow()
  if (currentWindow) {
    if (currentWindow.webContents.isDevToolsOpened()) {
      currentWindow.webContents.closeDevTools()
    } else {
      currentWindow.webContents.openDevTools()
    }
  }
}

if (app.isReady()) {
  app.on('window-all-closed', () => {
    globalShortcut.register('CommandOrControl+Shift+I', handleDevTools)
  })
  app.on('browser-window-blur', () => {
    globalShortcut.unregister('CommandOrControl+Shift+I')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
