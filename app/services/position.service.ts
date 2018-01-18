import { Injectable } from '@angular/core';

export interface IPosition {
    lon? : number;
    lat? : number;
    zoom? : number;
}

@Injectable()
export class MLPosition implements IPosition {
    // public lon : number;
    // public lat : number;
    // public zoom : number;

    constructor(public lon? : number, public lat? : number, public zoom? : number) { //public pos? : IPosition) {
        // if (pos) {
        //     this.lon = pos.lon;
        //     this.lat = pos.lat;
        //     this.zoom = pos.zoom;
        // } else {
        //     this.lon = this.lat = this.zoom = -1;
        // }
    }
};
