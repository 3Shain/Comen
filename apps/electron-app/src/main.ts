import {
  app,
  BrowserWindow,
  screen,
  Tray,
  Menu,
  nativeImage,
  Notification,
} from 'electron';
import { bootstrapBackendCore } from '@comen/backend-core';
import { environment } from './environments/environment';
import { join, resolve } from 'path';

/**
 * constants
 */

const iconPath = join(
  resolve(__dirname),
  '..',
  'core',
  'assets',
  'logo_solid.png'
);
const iconImage = nativeImage.createFromPath(iconPath);

let port = 0; //

async function initService() {
  port = (await bootstrapBackendCore({
    dev: !environment.production,
    frontendPath: join(resolve(__dirname), '..', 'core'), // core: frontendProject
  })).port;
}

let currentMainWindow: BrowserWindow | null = null;

function ready() {
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(1400, workAreaSize.width || 1400);
  const height = Math.min(960, workAreaSize.height || 960);
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    webPreferences: {
      contextIsolation: true,
      backgroundThrottling: false,
      devTools: !environment.production,
    },
  });
  currentMainWindow = mainWindow;
  mainWindow.setMenu(null);
  mainWindow.center();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.once('closed', () => {
    currentMainWindow = null;
  });

  if (!app.isPackaged) {
    mainWindow.loadURL(`http://localhost:${4200}`);
  } else {
    mainWindow.loadURL(`http://127.0.0.1:4000`); // TODO: this is determined by bootstrapBackendCore
  }

  if (process.platform === 'darwin') {
    app.dock.show();
  }
}

function setupTray() {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  if (process.platform === 'darwin' || process.platform === 'win32') {
    const appTray = new Tray(iconImage.resize({ width: 16, height: 16 }));
    const contextMenu = Menu.buildFromTemplate([
      { label: `当前运行端口: ${port}` },
      { type: 'separator' },
      {
        label: '退出 Comen',
        click: () => {
          app.quit();
        },
        role: 'quit'
      },
    ]);

    appTray.setToolTip('Comen - 后台运行中');
    appTray.setContextMenu(contextMenu);
    appTray.on('click', () => {
      if (currentMainWindow === null) {
        ready();
        appTray.destroy();
      }
    });
  }
}

async function main() {
  await initService();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' && process.platform !== 'win32') {
      app.quit();
    } else {
      new Notification({
        title: 'Comen已转到后台运行',
        body: '可通过托盘菜单退出程序。',
        // icon: iconImage
      }).show();
      setupTray();
    }
  });

  app.on('ready', () => {
    ready();
  });

  app.on('activate', () => {
    if (currentMainWindow === null) {
      ready();
    }
  });

  app.dock.hide();
}

main();
