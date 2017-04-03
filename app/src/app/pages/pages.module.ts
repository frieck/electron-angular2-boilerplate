import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { ModalModule } from 'ng2-bootstrap';

import { Pages } from './pages.component';

@NgModule({
  imports: [
    CommonModule, 
    NgaModule, 
    ModalModule.forRoot(),
    routing],
  declarations: [Pages]
})
export class PagesModule {
}
