// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import { Server } from './server';
import menuTeste from './helpers/teste_menu_template';
import createWindow from './helpers/window';
import freePort from './helpers/freePort';

var nems = require('./helpers/nems/lib/nems');

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow :Electron.BrowserWindow;

var menu :Electron.Menu;

var setApplicationMenu = function (mw :Electron.BrowserWindow) {
    var menus :Electron.MenuItemOptions[];
    menus = [editMenuTemplate, menuTeste(mw)];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', function () {
    
    nems.startMongo('"' + __dirname.replace('app.asar', '') + 'app.asar.unpacked/mongodb/3.4.2/bin"', 27018)
    .then((pid) => {
      console.log('MongoDB started (' + pid + ')');
    }).catch((err) => {
      console.log('MongoDB failed to start: ' + err);
    });

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
    nems.stop('"' + __dirname.replace('app.asar', '') + 'app.asar.unpacked/mongodb/3.4.2/bin"', 27018)
    .then((successMessage) => {
      console.log('MongoDB stoped: ' + successMessage);
    }).catch((err) => {
      console.log('MongoDB failed to stop: ' + err);
    });
    app.quit();
});