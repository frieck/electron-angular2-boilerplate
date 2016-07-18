/// <reference path="../node_modules/@angular/core/index.d.ts" />


import { Component } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar'

interface Greeting {
  text: string;
  name?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: "templates/greeting.html",
  directives: [

    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
  ],
})

export class AppComponent {
  greet: Greeting = {
    text: "Welcome, "
  };
}