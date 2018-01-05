import { Injectable, EventEmitter } from '@angular/core';;

@Injectable()
export class SlideShareService {
    slideData = new EventEmitter<any>();
}
