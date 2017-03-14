import { app, BrowserWindow } from 'electron';

export var devMenuTemplate :Electron.MenuItemOptions = {
    label: 'Development',
    submenu: [{
        label: 'Main',
        accelerator: 'CmdOrCtrl+M',
        click: function () {
            BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/index.html');
        }
    },
    {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function () {
            BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
        }
    },{
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function () {
            BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
        }
    },{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function () {
            app.quit();
        }
    }]
};
