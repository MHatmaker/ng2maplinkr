import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    EventEmitter } from '@angular/core';
    // ViewContainerRef,
    // ComponentRef,
    // ReflectiveInjector,
    // ViewChild,
    // ElementRef,
    // ComponentFactoryResolver } from '@angular/core';
import { IPosition, MLPosition } from '../services/position.service';
import { ConfigParams, IConfigParams } from '../services/configparams.service';
import { MLConfig } from '../libs/MLConfig';
import { MapInstanceService} from '../services/MapInstanceService';
import { CarouselComponent} from '../Carousel/carousel.component';
import { MultiCanvasEsri } from '../MultiCanvas/multicanvasesri.component';
import { MultiCanvasGoogle } from '../MultiCanvas/multicanvasgoogle.component';
import { CanvasService } from '../services/CanvasService';
import { ISlideData } from "../services/slidedata.interface";
import { SlideShareService } from '../services/slideshare.service';

@Component({
  selector: 'side-menu',
  providers: [MapInstanceService, CanvasService, SlideShareService],
  template: require('./sidemenu.component.html'),
  styles: [ require('./sidemenu.component.css')]
})
export class SideMenuComponent {
    constructor (private mapInstanceService : MapInstanceService, private canvasService : CanvasService,
            private slideshareService : SlideShareService) {

    }

    addCanvas (mapType, mlcfg, resolve) {
        console.log("in CanvasHolderCtrl.addCanvas");
        var currIndex = this.mapInstanceService.getSlideCount(),
            newCanvasItem,
            mapDctv,
            parentDiv,
            appendedElem,
            mapTypeToCreate,
            newpos,
            icfg,
            mlConfig;
        if (mlcfg) {
            mlConfig = mlcfg;
        } else {
            if (this.mapInstanceService.hasConfigInstanceForMap(currIndex) === false) {
                newpos = new MLPosition(-1, -1, -1);
                icfg = <IConfigParams>{mapId : -1, mapType : 'unknown', webmapId : '', mlposition : newpos}
                mlConfig = new MLConfig(icfg);
                console.log("addCanvas with index " + currIndex);
                console.debug(mlConfig);
                mlConfig.setConfigParams(this.mapInstanceService.getConfigInstanceForMap(
                    currIndex === 0 ? currIndex : currIndex - 1).getConfigParams());
                this.mapInstanceService.setConfigInstanceForMap(currIndex, mlConfig); //angular.copy(mlConfig));
            }
        }
        // let cmp = this.createComponent(this._placeHolder, MultiCanvas);
        if (mapType === 'google') {
            mapTypeToCreate = MultiCanvasGoogle;
        } else if (mapType === 'esri') {
            mapTypeToCreate = MultiCanvasEsri;
        }

        appendedElem = this.canvasService.appendNewCanvasToContainer(mapTypeToCreate, currIndex);
        this.mapInstanceService.incrementMapNumber();
        // this.broadcaster.broadcast('addslide', {
        this.slideshareService.slideData.emit({
                    mapListItem: appendedElem,
                    slideNumber: currIndex,
                    mapName: "Map " + currIndex
                });
    }
    removeCanvas (clickedItem) {
        console.log("removeCanvas");
        console.debug(clickedItem);
        // MapInstanceService.removeInstance(CarouselCtrl.getCurrentSlideNumber());
        this.slideshareService.slideRemove.emit();
    }
}
