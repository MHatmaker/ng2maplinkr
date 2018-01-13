
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MapInstanceService } from '../services/MapInstanceService';
import { Subscription } from 'rxjs/Subscription';
// import { MessageService } from '../services/messageindex.service';
// import { BroadcastBase } from '../services/broadcastbase.service';
// import { Broadcaster } from '../services/broadcaster.service';
import { SlideShareService } from '../services/slideshare.service';

@Component({
  selector: 'carousel',
  providers: [MapInstanceService], //, MessageService],
  template: require('./carousel.component.html'),
  styles: [require('./carousel.component.css')]
})
export class CarouselComponent { // extends BroadcastBase { //implements OnInit  {
    //console.log("Carousel : ready to set up Carousel");
    private items : Array<any> = new Array<any>();
    private activeSlideNumber = 0;
    private nextSlideNumber = 0;
    private currentSlide : any;
    private MapNo = 0;
    private MapName = "";
    // scope template variables
    private mapcolheight = 510;
    private mapcolWidth = window.innerWidth;
    private slidesCount = 0;;
    private showNavButtons = false;
    private showMapText = false;
    private ActNoAct = 'active';
    private subscription: Subscription;

    constructor(private mapInstanceService: MapInstanceService, private slideshareService : SlideShareService) {
        // super(broadcaster);
        console.log("Carousel ctor");
        // this.mapInstanceService = mapInstanceService;
        // this.currentSlide = this.items[0] || null;
        this.slideshareService.slideData.subscribe(
          (data: any) => {
            console.log(data);
            this.onaddslide(data);
            // this.myData = data;
          });
    }
    /*
    ngOnInit() {
        self = this;
        // subscribe to home component messages
        //this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; this.logMessage(message); })
    }*/

    private logMessage(msg) {
        console.log(msg);
    }
    onUpdate(event) {
        // this.counter = event.value;
        console.log("onUpdate in CarouselComponent");
        console.debug(event);
      }
    // navigate through the carousel
    private navigate(direction : number) {
        // hide the old currentSlide list item
        this.currentSlide.classList.remove('carousel-current');
        // this.currentSlide.removeClass();

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
        this.currentSlide.classList.add('carousel-current');
        // this.currentSlide.addClass();
        this.mapInstanceService.setCurrentSlide(this.items[this.activeSlideNumber].slideNumber);
    }

    onaddslide (slideData) {
        console.log("CarouselCtrl on addslide to array with length " + this.items.length);
        console.debug(slideData);
        var multican;
        if (this.items.length > 0) {
            this.currentSlide.classList.remove('carousel-current');
            // this.currentSlide.removeClass();
        }
        this.items.push(slideData);
        this.currentSlide = this.items[this.items.length - 1].mapListItem;
        this.activeSlideNumber = this.MapNo = this.items.length - 1;
        this.nextSlideNumber += 1;
        this.MapName = slideData.mapName;
        multican = this.items[this.items.length - 1];
        this.currentSlide.classList.add('carousel-basic');
        this.currentSlide.classList.add('carousel-current');
        // multican.mapListItem.classList.add('current');

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
