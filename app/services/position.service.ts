import { Injectable } from '@angular/core';

@Injectable()
export class MLPosition {
    public lon : number;
    public lat : number;
    public zoom : number;

    constructor(pos? : IPosition) {
        if (pos) {
            this.lon = pos.lon;
            this.lat = pos.lat;
            this.zoom = pos.zoom;
        } else {
            this.lon = this.lat = this.zoom = -1;
        }
    }
};

export interface IPosition {
    lon : number;
    lat : number;
    zoom : number;
}
