const { BrowserWindow } = require('electron')

let loadingScreen

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(
    Object.assign({
      width: 400,
      height: 200,
      frame: false,
      transparent: false
    })
  )

  loadingScreen.setResizable(false)
  loadingScreen.loadURL('loadingscreen.html')

  loadingScreen.on('closed', () => (loadingScreen = null))
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show()
  })
}

module.exports = {
  createLoadingScreen,
}