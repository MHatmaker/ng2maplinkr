import { Injectable } from '@angular/core';
import { IPosition, MLPosition } from './position.service';

export interface IConfigParams {
    mapId : number;
    mapType : string;
    webmapId : string;
    mlposition : IPosition;
}

console.log("loading ConfigParams");

@Injectable()
export class ConfigParams implements IConfigParams{

    constructor(
         public mapId : number  = -1,
         public mapType : string,
         public webmapId : string,
         public mlposition : IPosition) {

        // this.mapId = mapId;
        // this.mapType = mapType;
        // this.webmapId = webmapId;
        // if (mlposition) {
        //     this.mlposition.lon = mlposition.lon;
        //     this.mlposition.lat = mlposition.lat;
        //     this.mlposition.zoom = mlposition.zoom;
        // } else {
        //     this.mlposition.lon = this.mlposition.lat = this.mlposition.zoom = -1;``
        // }
    }
};
