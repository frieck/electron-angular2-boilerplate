/// <reference path="../node_modules/@angular/core/index.d.ts" />


import { Component } from '@angular/core';

interface Greeting {
  text: string;
  name?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: "templates/greeting.html"
})

export class AppComponent {
  greet: Greeting = {
    text: "Welcome, "
  };
}