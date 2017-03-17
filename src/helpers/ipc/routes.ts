var Q = require('q');

export default function (mainWindow :Electron.BrowserWindow, ipc: any) :void{

    ipc.on('getProjectVersion', (testData) => {
        var q = Q.defer();

        console.log("HAAAAAAAA!");

        //q.resolve("Version for " + testData + " is 1.0.0");
        return q.promisse;
    });

}