import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './EsriMap/esrimap.component';
import { ESRIMapService } from './services/esrimap.service';
import { MultiCanvas } from './MultiCanvas/multicanvas.component';

import { CanvasHolderComponent } from './CanvasHolder/canvasholder.component';
import { CoordinateComponent } from './coordinate/coordinate.component';
import { CarouselComponent } from './Carousel/carousel.component';
import { DomService } from './services/dom.service';
import { MapInstanceService } from './services/MapInstanceService';
import { CanvasService } from './services/CanvasService';
import { MLConfig } from './libs/MLConfig';
import { MessageService } from './services/messageindex.service';
import { Broadcaster } from './services/broadcaster.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    EsriMapComponent,
    MultiCanvas,
    CanvasHolderComponent,
    CarouselComponent,
    CoordinateComponent
  ],
  entryComponents : [
    MultiCanvas,
    EsriMapComponent
  ],
  providers: [
    ESRIMapService,
    CanvasService,
    MapInstanceService,
    MLConfig,
    MessageService,
    Broadcaster
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {

  }
}
