import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esrimap.component';
import { ESRIMapService } from './esrimap.service';

import { CanvasHolderComponent } from './CanvasHolder/canvasholder.component';
import { CoordinateComponent } from './coordinate/coordinate.component';
import { CarouselComponent } from './Carousel/carousel.component';
import { MapInstanceService } from './services/MapInstanceService';
import { CanvasService } from './services/CanvasService';
import { MLConfig } from './libs/MLConfig';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    EsriMapComponent,
    CanvasHolderComponent,
    CarouselComponent,
    CoordinateComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ESRIMapService,
    CanvasService,
    MapInstanceService,
    MLConfig
  ]
})
export class AppModule {
  constructor() {

  }
}
