import {Component} from '@angular/core';
var PromiseIpc = require('electron-promise-ipc').PromiseIpcRenderer;

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  public version :string;

  constructor() {
    var ipc = new PromiseIpc();

    ipc.send('getProjectVersion', 'Teste')
    .then((v) => {this.version = v})
    .catch((e) => {console.error(e)});
  }



}
