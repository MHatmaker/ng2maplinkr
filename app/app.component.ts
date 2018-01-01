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

  onViewCreated() {
    console.log('view created');
  }
}
