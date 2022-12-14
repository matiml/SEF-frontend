const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    title: 'Smart Effortless Filter',
    width: 1200,
    height: 1000,
    minHeight: 800,
    minWidth: 1000,
    maxHeight: 1200,
    maxWidth: 1400,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev
    }
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.removeMenu();

  mainWindow.once('ready-to-show', () => mainWindow.show());
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});