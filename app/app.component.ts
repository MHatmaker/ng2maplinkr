import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  template: require('./app.component.html')
})
export class AppComponent implements OnInit {
  name: string;
  constructor() {
      this.name = `Angular version is : v${VERSION.full}`;
      console.log(this.name);
  }
  ngOnInit() {

  }

  onViewCreated() {
    console.log('view created');
  }
}
