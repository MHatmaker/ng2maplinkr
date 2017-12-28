import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {

  }
  addCanvas() {
      console.log("addCanvas in app.component.ts");
  }

  onViewCreated() {
    console.log('view created');
  }
}
