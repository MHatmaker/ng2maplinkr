import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanvasService } from '../services/CanvasService';

@Component({
  selector: 'multi-canvas',
  template: require('./multicanvas.component.html'),
  styles: ['style.backgroundColor="#888"']  //[require('./multicanvas.component.css')]
})

export class MultiCanvas {
    private el = null;
    private ndx : number = null;

    constructor(private canvasService: CanvasService) {
        console.log("ndx is " + this.canvasService.getIndex());
        this.ndx = this.canvasService.getIndex();
    }
    /*
            Canvas.prototype.init = function () {
                var mapParent = document.getElementsByClassName('MapContainer')[0];

                this.el.style.backgroundColor = "#888";
                // this.el.addEventListener("mousedown", this.onMouseDown.bind(this));
                // this.el.addEventListener("mousemove", this.onMouseMove.bind(this));

                mapParent.appendChild(this.el);
            };
      */
    onMouseDown (event) {
        console.log('onMouseDown: '); //, this.el);
        console.log(event.srcElement);
        // event.cancelBubble=true;
        // event.stopPropagation();
    }
    onMouseMove (event) {
        //console.log('onMouseMove: ', this.el);
        event.preventDefault();
        // event.cancelBubble=true;
        // event.stopPropagation();
    }
}
