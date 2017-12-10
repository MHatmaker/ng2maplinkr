import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esrimap.component';
import { ESRIMapService } from './esrimap.service';

import { CoordinateComponent } from './coordinate/coordinate.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    EsriMapComponent,
    CoordinateComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ESRIMapService
  ]
})
export class AppModule {
  constructor() {

  }
}
