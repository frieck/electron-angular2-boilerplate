// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import devMenuTemplate from './helpers/menu_template';
import { Server } from './server';
import createWindow from './helpers/window';

import freePort from './helpers/freePort';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow :Electron.BrowserWindow;

var menu :Electron.Menu;

var setApplicationMenu = function (mw :Electron.BrowserWindow) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(devMenuTemplate(mw)));
};

app.on('ready', function () {
    
    freePort((port) => {
        console.log(port);

        var server = new Server(port);
        server.start();

        var mainWindow = createWindow('main', {
            width: 1000,
            height: 600
        });

        setApplicationMenu(mainWindow);

        mainWindow.loadURL('http://localhost:' + port);

        if (env.name !== 'production') {
            mainWindow.webContents.openDevTools();
        }
    });
});

app.on('window-all-closed', function () {
    app.quit();
});