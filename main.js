const { app, BrowserWindow } = require('electron')
const { createLoadingScreen } = require('./loading')

let mainWindow
let loadingScreen

function createMainWindow () {
  mainWindow = new BrowserWindow({
    show: false, // this line is important
    // other options
  })

  mainWindow.loadURL("index.html")

  mainWindow.on('ready-to-show', () => {
    if(loadingScreen) {
      loadingScreen.close()
    }
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
    loadingScreen = createLoadingScreen();
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.close();
        loadingScreen = null; // Make sure to dereference the loadingScreen object after it's closed
      }
      createMainWindow()
      mainWindow.show()
    }, 5000);
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})