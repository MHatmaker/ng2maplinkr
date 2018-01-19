import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './EsriMap/esrimap.component';
import { GoogleMapComponent } from './GoogleMap/googlemap.component';
import { ESRIMapService } from './services/esrimap.service';
import { MultiCanvasEsri } from './MultiCanvas/multicanvasesri.component';
import { MultiCanvasGoogle } from './MultiCanvas/multicanvasgoogle.component';

import { CanvasHolderComponent } from './CanvasHolder/canvasholder.component';
import { CoordinateComponent } from './coordinate/coordinate.component';
import { CarouselComponent } from './Carousel/carousel.component';
import { DomService } from './services/dom.service';
import { MapInstanceService } from './services/MapInstanceService';
import { CanvasService } from './services/CanvasService';
import { SlideShareService } from './services/slideshare.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      // apiKey: 'AIzaSyAwAOGAxY5PZ8MshDtaJFk2KgK7VYxArPA'
    })
  ],
  declarations: [
    AppComponent,
    EsriMapComponent,
    GoogleMapComponent,
    MultiCanvasEsri,
    MultiCanvasGoogle,
    CanvasHolderComponent,
    CarouselComponent,
    CoordinateComponent
  ],
  entryComponents : [
    MultiCanvasEsri,
    MultiCanvasGoogle,
    EsriMapComponent,
    GoogleMapComponent
  ],
  providers: [
    ESRIMapService,
    CanvasService,
    MapInstanceService,
    SlideShareService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {

  }
}
