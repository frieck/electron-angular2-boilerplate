import {
    app,
    BrowserWindow
} from 'electron';
import env from './../env';


export default function(mainWindow) {
    var mainMenuTemplate;
    
    if (env.name !== 'production') {
        mainMenuTemplate = [{
            label: 'Edit',
            submenu: [{
                role: 'undo'
            }, {
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                role: 'cut'
            }, {
                role: 'copy'
            }, {
                role: 'paste'
            }, {
                role: 'delete'
            }, {
                role: 'selectall'
            }]
        }, {
            label: 'View',
            submenu: [{
                label: 'Recarregar',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            }, {
                label: 'Main',
                accelerator: 'CmdOrCtrl+M',
                click: function (item, focusedWindow) {
                    focusedWindow.loadURL('file://' + __dirname + '/index.html');
                }
            }, {
                label: 'Toggle Fullscreen',
                role: 'togglefullscreen'
            }, {
                label: 'Development Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.webContents.toggle
                }
            }]
        }, {
            label: 'Window',
            role: 'window',
            submenu: [{
                role: 'minimize'
            }, {
                role: 'close'
            }]
        }, {
            label: 'Help',
            role: 'help',
            submenu: [{
                    label: `About ${app.getName()}`,
                    click(item, focusedWindow) {
                        mainWindow.webContents.send('showModal', 'about');
                    }
                }, {
                label: 'Procurar atualizações',
                click(item, focusedWindow) {
                    mainWindow.webContents.send('doControllCall', 'checkUpdate');
                }
            }]
        }];

        if (process.platform === 'darwin') {
            console.log(app.getName());
            mainMenuTemplate.unshift({
                label: app.getName(),
                submenu: [{
                    label: `About ${app.getName()}`,
                    click(item, focusedWindow) {
                        mainWindow.webContents.send('showModal', 'about');
                    }
                }, {
                    type: 'separator'
                }, {
                    role: 'services',
                    submenu: []
                }, {
                    type: 'separator'
                }, {
                    role: 'hide'
                }, {
                    role: 'hideothers'
                }, {
                    role: 'unhide'
                }, {
                    type: 'separator'
                }, {
                    role: 'quit'
                }]
            });
            mainMenuTemplate[3].submenu = [{
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                label: 'Zoom',
                role: 'zoom'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                role: 'front'
            }]
        }
    } else {
        mainMenuTemplate = [{
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                role: 'undo'
            }, {
                label: 'Redo',
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                role: 'cut'
            }, {
                label: 'Copy',
                role: 'copy'
            }, {
                label: 'Paste',
                role: 'paste'
            }, {
                label: 'Remove',
                role: 'delete'
            }, {
                label: 'Select All',
                role: 'selectall'
            }]
        }, {
            label: 'View',
            submenu: [{
                role: 'togglefullscreen'
            }]
        }, {
            label: 'Window',
            role: 'window',
            submenu: [{
                label: 'Minimize',
                role: 'minimize'
            }, {
                label: 'Close',
                role: 'close'
            }]
        }, {
            label: 'Help',
            role: 'help',
            submenu: [{
                label: 'Check for Updates',
                click(item, focusedWindow) {
                    mainWindow.webContents.send('doControllCall', 'checkUpdate');
                }
            }, {
                label: `Version ${app.getVersion()}`,
                enabled: false
            }]
        }];

        if (process.platform === 'darwin') {
            mainMenuTemplate.unshift({
                label: app.getName(),
                submenu: [{
                    role: 'about'
                }, {
                    type: 'separator'
                }, {
                    role: 'services',
                    submenu: []
                }, {
                    type: 'separator'
                }, {
                    role: 'hide'
                }, {
                    role: 'hideothers'
                }, {
                    role: 'unhide'
                }, {
                    type: 'separator'
                }, {
                    role: 'quit'
                }]
            });
            mainMenuTemplate[3].submenu = [{
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                label: 'Zoom',
                role: 'zoom'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                role: 'front'
            }]
        }
    }
    return mainMenuTemplate;
};