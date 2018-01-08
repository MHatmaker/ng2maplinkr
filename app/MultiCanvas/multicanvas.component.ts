import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanvasService } from '../services/CanvasService';

@Component({
  selector: 'multi-canvas',
  template: require('./multicanvas.component.html'),
  styles: [require('./multicanvas.component.css')]
})

export class MultiCanvas {
    private el = null;
    private ndx : number = null;
    private slideClass : Array<any> = new Array<any>();

    constructor(private canvasService: CanvasService) {
        console.log("ndx is " + this.canvasService.getIndex());
        this.ndx = this.canvasService.getIndex();
        this.slideClass = [];
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

    addClass() {
      this.slideClass.push('current');
    }

    removeClass() {
      this.slideClass.pop();
    }

    checkClass() {
      if(this.slideClass.indexOf('current') == -1) {
         alert('false');
      } else {
         alert('true');
      }
    }
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
