import { Injectable } from '@angular/core';

export interface IPosition {
    lon : number;
    lat : number;
    zoom : number;
}

console.log("loading MLPosition");

@Injectable()
export class MLPosition implements IPosition {
     lon : number;
     lat : number;
     zoom : number;

    constructor( lon : number,  lat : number,  zoom : number) { // pos? : IPosition) {
        this.lon = lon;
        this.lat = lat;
        this.zoom = zoom;
        // if (pos) {
        //     this.lon = pos.lon;
        //     this.lat = pos.lat;
        //     this.zoom = pos.zoom;
        // } else {
        //     this.lon = this.lat = this.zoom = -1;
        // }
    }
};
