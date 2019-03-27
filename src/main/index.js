'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

let receptionHelper
function createReceptionHelperWindow () {
  /**
   * Initial window options
   */
  receptionHelper = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    show: false
  })

  receptionHelper.loadURL(winURL)

  receptionHelper.on('closed', () => {
    receptionHelper = null
  })
  receptionHelper.once('ready-to-show', () => {
  })
  receptionHelper.on('focus', (event, arg) => {
    event.sender.send('load', 1)
  })
  receptionHelper.on('closed', () => {
    createReceptionHelperWindow()
  })
}

function create () {
  createWindow()
  createReceptionHelperWindow()
}
app.on('ready', create)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    create()
  }
})

ipcMain.on('createReceptionHelper', (event, arg) => {
  receptionHelper.show()
  event.sender.send('receptionHelperReply', receptionHelper.id)
  if (receptionHelper === null) {
    receptionHelper.show()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
