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
import { MLConfig } from '../libs/MLConfig';
import { MapInstanceService} from '../services/MapInstanceService';
import { CarouselComponent} from '../Carousel/carousel.component';
import { MultiCanvas } from '../MultiCanvas/multicanvas.component';
import { CanvasService } from '../services/CanvasService';
import { SlideData } from "../services/slidedata.interface";
// import { MessageService } from '../services/messageindex.service';
// import { BroadcastBase } from '../services/broadcastbase.service';
// import { Broadcaster } from '../services/broadcaster.service';
import { SlideShareService } from '../services/slideshare.service';

declare var google;

@Component({
  selector: 'canvas-holder',
  providers: [MapInstanceService, CanvasService, MLConfig, SlideShareService],
  template: require('./canvasholder.component.html'),
  styles: [require('./canvasholder.component.css')]
})
export class CanvasHolderComponent {
    private isInstantiated : boolean;
    private outerMapNumber : number = 0;
    // private broadcaster : Broadcaster;

    // @ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

    constructor (private mapInstanceService : MapInstanceService, private canvasService : CanvasService,
        private slideshareService : SlideShareService) { //, private _cmpFctryRslvr: ComponentFactoryResolver) {
        // super(broadcaster);
        var
            mapLocOptions = {
                center: new google.maps.LatLng(37.422858, -122.085065),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            mlconfig = new MLConfig(this.outerMapNumber);
        mlconfig.setMapType('google');
        mlconfig.setPosition({'lon' : 37.422858, "lat" : -122.085065, "zoom" : 15});
        this.mapInstanceService.setConfigInstanceForMap(this.outerMapNumber, mlconfig);
    }
    sendMessage(): void {
            // send message to subscribers via observable subject
            console.log("Message from CanvasHolderComponent to CarouselComponent!");
            // this.messageService.sendMessage('Message from CanvasHolderComponent to CarouselComponent!');
        }
        /*
    public createComponent (vCref: ViewContainerRef, type: any): ComponentRef<any> {

        let factory = this._cmpFctryRslvr.resolveComponentFactory(type);

        // vCref is needed cause of that injector..
        let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);

        // create component without adding it directly to the DOM
        let comp = factory.create(injector);

        return comp;
    }*/
    addCanvas (mapType, mlcfg, resolve) {
        console.log("in CanvasHolderCtrl.addCanvas");
        var currIndex = this.mapInstanceService.getSlideCount(),
            // mlConfig = new MLConfig.MLConfig(currIndex),
            newCanvasItem,
            mapDctv,
            parentDiv,
            // $timeout = timeout,
            appendedElem,
            mlConfig;
        if (mlcfg) {
            mlConfig = mlcfg;
        } else {
            if (this.mapInstanceService.hasConfigInstanceForMap(currIndex) === false) {
                mlConfig = new MLConfig(currIndex);
                console.log("addCanvas with index " + currIndex);
                console.debug(mlConfig);
                mlConfig.setPosition(this.mapInstanceService.getConfigInstanceForMap(currIndex === 0 ? currIndex : currIndex - 1).getPosition());
                this.mapInstanceService.setConfigInstanceForMap(currIndex, mlConfig); //angular.copy(mlConfig));
            }
        }
        // let cmp = this.createComponent(this._placeHolder, MultiCanvas);

        appendedElem = this.canvasService.appendNewCanvasToContainer(MultiCanvas, currIndex);
        this.mapInstanceService.incrementMapNumber();
        // this.broadcaster.broadcast('addslide', {
        this.slideshareService.slideData.emit({
                    mapListItem: appendedElem,
                    slideNumber: currIndex,
                    mapName: "Map " + currIndex
                });
        // this.sendMessage();
        // clickHandler.onaddslide();
    }
    removeCanvas (clickedItem) {
        console.log("removeCanvas");
        console.debug(clickedItem);
        // MapInstanceService.removeInstance(CarouselCtrl.getCurrentSlideNumber());
        this.slideshareService.slideRemove.emit();
    }
}

    // newCanvasItem = CanvasService.makeCanvasSlideListItem(currIndex);
    // mapDctv = document.createElement('mapdirective');
    // parentDiv = newCanvasItem;
    // CanvasService.loadCanvasSlideListItem(newCanvasItem, currIndex);

    // parentDiv.appendChild(mapDctv);
    // $timeout(function () {
    //     angular.element(mapDctv).injector().invoke(function ($compile) {
    //         var scope = angular.element(mapDctv).scope();
    //         // parentDiv.appendChild(mapDctv);
    //         $compile(mapDctv)(scope);
    //         console.log("CanvasHolderCtrl compiled mapDctv with map id " + currIndex);
    //         console.debug(scope);
    //         // scope.safeApply();
    //         $timeout(function () {
    //             // currIndex = MapInstanceService.getSlideCount();
    //             // var
    //             //     mlConfig = new MLConfig.MLConfig(currIndex);
    //             // MapInstanceService.setConfigInstanceForMap(currIndex, angular.copy(mlConfig));
    //             console.log('CanvasHolderCtrl ready to startMap with currIndex ' + currIndex);
    //
    //             scope.startMap(currIndex, mapType);
    //             MapInstanceService.incrementMapNumber();
    //             if (resolve) {
    //                 resolve();
    //             }
    //         }, 1000);
    //     });
    // }, 1000);
/*
                $scope.$on('selectMapTypeEvent', function (evt, data) {
                    console.log('CanvasHolderCtrl on selectMapTypeEvent');
                    console.debug(data);
                    $scope.addCanvas(data.mapType);
                });
                $scope.$broadcast('addslide', {
                    mapListItem: newCanvasItem,
                    slideNumber: currIndex,
                    mapName: "Map " + currIndex
                });
                angular.element($window).bind('resize', function () {
                    $scope.$broadcast('CanvasHolderResizeEvt');
                });
                $scope.centerOnMe = function () {
                    console.log("centerOnMe");
                    var currentMapNumber = MapInstanceService.getCurrentSlide(),
                        currentMapInstance = MapInstanceService.getMapHosterInstance(currentMapNumber);
                    console.log("getCurrentSlide() returned " + currentMapNumber);
                    console.log("CanvasHolderCtrl.centerOnMe for map " + currentMapNumber);
                    currentMapInstance.centerOnMe();
                };
                selfMethods.centerOnMe = $scope.centerOnMe;
            };
            selfMethods.addCanvas = $scope.addCanvas;

            $scope.removeCanvas = function (clickedItem) {
                console.log("removeCanvas");
                console.debug(clickedItem);
                MapInstanceService.removeInstance(CarouselCtrl.getCurrentSlideNumber());
                $scope.$broadcast('removeslide');
            };
            selfMethods.removeCanvas = $scope.removeCanvas;

            $scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase === '$apply' || phase === '$digest') {
                    if (fn && (typeof fn === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;


        }
        */
        /*
        function init() {
            console.log('CanvasHolderCtrl init');
            if (!isInstantiated) {
                var locApp = angular.module('mapModule');

                locApp.controller('CanvasHolderCtrl',  ['$scope', '$rootScope', '$timeout', '$uibModal', 'LinkrService', 'MapInstanceService', 'CanvasService', '$window', CanvasHolderCtrl]);
                // angular.bootstrap(document.getElementById('year'), ['example']);
                isInstantiated = true;
            }
        }*/
