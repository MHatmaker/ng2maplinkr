import { Injectable, EventEmitter } from '@angular/core';
import { SlideData } from "../services/slidedata.interface";

@Injectable()
export class SlideShareService {
    slideData = new EventEmitter<SlideData>();
    slideRemove = new EventEmitter();
}
