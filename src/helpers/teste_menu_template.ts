import { app, BrowserWindow } from 'electron';

export default function menuTeste(mainWindow) :any {
    let test = {
        label: 'Go',
        submenu: [{
            label: 'Login',
            accelerator: 'CmdOrCtrl+L',
            click: function () {
                mainWindow.webContents.send('LoadPage', 'login');
            }
        }]
    } 
    return test;
};
