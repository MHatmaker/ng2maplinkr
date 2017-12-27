import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef,
    ComponentRef
} from '@angular/core';

import {MultiCanvas} from '../MultiCanvas/multicanvas.component';

@Injectable()
export class CanvasService {
    private ndx : number;

    constructor (
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
      ){
    }

    getIndex () {
        return this.ndx;
    }
    appendNewCanvasToContainer(component : any, ndx : number) {
        this.ndx = ndx;
        var mapParent = document.getElementsByClassName('MapContainer')[0];
        // Create a component reference from the component
        const componentRef = this.componentFactoryResolver
          .resolveComponentFactory(component)
          .create(this.injector);

        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        mapParent.appendChild(domElem);
    }
    /*
        function initService() {
            var
                app = angular.module('mapModule');
            console.log("ready to create CanvasService");
            app.service('CanvasService', [
                function () {
                    var canvases = [];

                    console.log("CanvasService to return canvas");

                    this.makeCanvasSlideListItem = function (ndx) {
                        var newCanvasItem = document.createElement('li');
                        newCanvasItem.id = "slide" + ndx;
                        return newCanvasItem;
                    };
                    this.loadCanvasSlideListItem = function (elem, ndx) {
                        canvases.push(new MultiCanvas.Canvas(elem, ndx));
                        canvases[canvases.length - 1].init();
                    };

                    this.getCanvasSlideListItem = function (ndx) {
                        return canvases[ndx];
                    };

                }
            ]);
        }
        */
}
