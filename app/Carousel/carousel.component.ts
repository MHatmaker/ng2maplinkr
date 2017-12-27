
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MapInstanceService } from '../services/MapInstanceService';

@Component({
  selector: 'carousel',
  providers: [MapInstanceService],
  template: require('./carousel.component.html')
  // styles: [require('./carousel.component.css')]
})
export class CarouselComponent {
    //console.log("Carousel : ready to set up Carousel");
    private items : Array<any>;
    private activeSlideNumber = 0;
    private nextSlideNumber = 0;
    private currentSlide = this.items[0];
    private MapNo = 0;
    private MapName = "";
    private mapInstanceService = null;
    // scope template variables
    private mapcolheight = 510;
    private mapcolWidth = window.innerWidth;
    private slidesCount = this.items.length;
    private showNavButtons = false;
    private showMapText = false;
    private ActNoAct = 'active';

    constructor(mapInstanceService: MapInstanceService) {
        // this.mapInstanceService = mapInstanceService;
    }

    // navigate through the carousel
    private navigate(direction : number) {
        // hide the old currentSlide list item
        this.currentSlide.classList.remove('current');

        console.log("change activeSlideNumber from " +this. activeSlideNumber);
        // calculate the new position
        this.activeSlideNumber = (this.activeSlideNumber + direction) % this.slidesCount;
        this.activeSlideNumber = this.activeSlideNumber < 0 ? this.slidesCount - 1 : this.activeSlideNumber;
        console.log("to activeSlideNumber " + this.activeSlideNumber);
        // set new currentSlide element
        // and add CSS class
        this.currentSlide = this.items[this.activeSlideNumber].mapListItem;
        this.MapNo = this.activeSlideNumber;
        this.MapName = this.items[this.activeSlideNumber].mapName;
        this.currentSlide.classList.add('current');
        this.mapInstanceService.setCurrentSlide(this.items[this.activeSlideNumber].slideNumber);
    }

    onaddslide (event, slideData) {
        console.log("CarouselCtrl on addslide to array with length " + this.items.length);
        console.debug(slideData);
        if (this.items.length > 0) {
            this.currentSlide.classList.remove('current');
        }
        this.items.push(slideData);
        this.currentSlide = this.items[this.items.length - 1].mapListItem;
        this.activeSlideNumber = this.MapNo = this.items.length - 1;
        this.nextSlideNumber += 1;
        this.MapName = slideData.mapName;
        this.currentSlide.classList.add('current');
        this.slidesCount = this.items.length;
        this.showNavButtons =this.slidesCount  > 1;
        this.showMapText = this.slidesCount > 0;
    }
    onremoveslide () {
        var slideToRemove = this.activeSlideNumber,
              slideElement = document.getElementById('slide' + slideToRemove);
        console.log("remove slide " + this.activeSlideNumber + " from items array with length" + this.items.length);
        if (slideToRemove > -1) {
            this.items.splice(slideToRemove, 1);
            this.slidesCount = this.items.length;
            this.showNavButtons =this.slidesCount  > 1;
            this.showMapText = this.slidesCount > 0;
            console.log("items length is now " + this.items.length);
            if (slideToRemove) {
                slideElement.remove();
            }
            this.navigate(0);
        }

    }
    // add event handlers to buttons
    onClickNext () {
        console.log("next");
        this.navigate(1);
    }
    onClickPrev () {
        console.log("prev");
        this.navigate(-1);
    }

    getCurrentSlideNumber () {
        return this.items[this.activeSlideNumber].slideNumber;
    }
    getNextSlideNumber () {
        return this.nextSlideNumber;
    }

}
