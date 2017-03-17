var PromiseIpc = require('electron-promise-ipc').PromiseIpcMain;
import routes from './routes';


export default function (mainWindow :Electron.BrowserWindow) :void{
    var ipc = new PromiseIpc();

    routes(mainWindow, ipc);
    
}