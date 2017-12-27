import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'canvas-holder',
  template: require('./CanvasHolder/canvasholder.component.html')
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
