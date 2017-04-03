import { Component, ViewChild } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { ipcRenderer, remote } from 'electron';

import { ModalDirective } from 'ng2-bootstrap';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  templateUrl: './pages.html',
  styleUrls: ['./pages.scss'],
})
export class Pages {

   app: any;
  @ViewChild('aboutModal') aboutModal: ModalDirective;

  constructor(private _menuService: BaMenuService, private router: Router) {
    this.app = {};
    this.app.name = remote.app.getName();
    this.app.version = remote.app.getVersion();
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

    ipcRenderer.on('LoadPage', (event, page, args) => {
      console.log('LoadPage', event, page, args);
      this.router.navigate([page]);
    });

    ipcRenderer.on('showModal', (event, modal) => {
      switch(modal) {
        case "about":
          this.aboutModal.show();
        break;

      }
    });
  }



}
