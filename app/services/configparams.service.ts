import { Injectable } from '@angular/core';
import { MLPosition } from './position.service';
import { IPosition } from './position.service';

@Injectable()
export class ConfigParams {
    private mlposition : MLPosition;

    constructor(
        private mapId : number  = -1,
        private mapType : string = 'unknown',
        private webmapId : string = "unknown",
        pos? : IPosition) {
        if (pos) {
            this.mlposition.lon = pos.lon;
            this.mlposition.lat = pos.lat;
            this.mlposition.zoom = pos.zoom;
        } else {
            this.mlposition.lon = this.mlposition.lat = this.mlposition.zoom = -1;``
        }
    }
};

export interface IConfigParams {
    mlposition : MLPosition;
    mapId : number;
    mapType : string;
    webmapId : string;
}
