import {
    Injectable,
} from '@angular/core';
import { IPosition, MLPosition } from "../services/position.service";
import { IConfigParams, ConfigParams } from "../services/configparams.service";

console.log("loading MLConfig");

@Injectable()
export class MLConfig {
    private staticMethods = {};
    private details = {
        mapId :  -1, //this.ndx,
        userId : "",
        referrerId : "",
        referrerName : "",
        isInitialUser : true,
        url : "",
        locationPath : "",
        maphost : "",
        masherChannel : "",
        query : "",
        bounds : {llx : -1, lly : -1, urx : -1, ury : -1},
        mapType : 'google',
        mapHosterInstance : null,
        mapNumber: null,
        mapHoster : null,
        webmapId : "a4bb8a91ecfb4131aa544eddfbc2f1d0",
        mlposition : null, // = new MLPosition(),
        /*
        lat : '',
        lon : '',
        zoom : '',
        */
        nginj : null,
        protocol : 'http',
        host : '', //"http://localhost",
        hostport : '3035',
        href : '', //"http://localhost",
        search: '/',
        startupView : {'summaryShowing' : true, 'websiteDisplayMode' : true},
        smallFormDimensions : { 'top' : 1, 'left' : 1, 'width' : 450, 'height' : 570}
    };

    constructor (cfgparams : IConfigParams) {
        this.details.mlposition = cfgparams.mlposition;
        this.details.mapId = cfgparams.mapId;
        this.details.mapType = cfgparams.mapType;
        this.details.webmapId = cfgparams.webmapId;
    }

    getParameterByName (name : string, details? : any) {
        // console.log("get paramater " + name + " from " + this.details.search);
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(this.details.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    setMapId (id) {
        console.log("MLConfig setMapId to " + id);
        this.details.mapId = id;
        console.log("MapId is now " + this.details.mapId);
    }
    getMapId () {
        return this.details.mapId;
    }
    setMapType (type) {
        this.details.mapType = type;
    }
    getMapType () {
        return this.details.mapType;
    }
    setMapNumber (mapNo) {
        this.details.mapNumber = mapNo;
    }
    getMapNumber () {
        return this.details.mapNumber;
    }
    setMapHosterInstance (inst) {
        this.details.mapHosterInstance = inst;
        if (!inst) {
            console.log("attempting to setMapHosterInstance to null/undefined");
        }
        console.log("MLConfig.setMapHosterInstance is set to " + this.details.mapNumber);
        console.debug(this.details.mapHosterInstance);
    }
    getMapHosterInstance () {
        console.log("MLConfig.getMapHosterInstance is returning instance " + this.details.mapId);
        console.debug(this.details.mapHosterInstance);
        if (!this.details.mapHosterInstance) {
            console.log("attempting to getMapHosterInstance containing null/undefined");
        }
        return this.details.mapHosterInstance;
    }
    getWebmapId (newWindow) {
        var result = "";
        if (newWindow === true) {
            result = this.getParameterByName('id', this.details);
            if (result === "") {
                result = this.details.webmapId;
            }
        } else {
            result = this.details.webmapId;
        }
        return result;
    }
    setWebmapId (id) {
        console.log("Setting webmapId to " + id);
        this.details.webmapId = id;
    }
    getUserId () {
        return this.details.userId;
    }
    setUserId (id) {
        this.details.userId = id;
    }
    getReferrerId () {
        return this.details.referrerId;
    }
    getReferrerIdFromUrl () {
        this.details.referrerId = this.getParameterByName('referrerId');
        return this.details.referrerId;
    }
    setReferrerId (id) {
        this.details.referrerId = id;
    }
    getReferrerNameFromUrl () {
        this.details.referrerName = this.getParameterByName('referrerName');
        return this.details.referrerName;
    }
    testUrlArgs () {
        var rslt = this.getParameterByName('id', this.details);
        // alert("getParameterByName('id') = " + rslt);
        // alert(rslt.length);
        // alert(rslt.length != 0);

        console.log("getParameterByName('id') = " + rslt);
        console.log(rslt.length);
        console.log(rslt.length !== 0);
        return rslt.length !== 0;
    }

    setUrl (u) {
        this.details.url = u;
    }
    getUrl () {
        return this.details.url;
    }
    getbaseurl () {
        var baseurl = this.details.protocol + "//" + this.details.host + "/";
        console.log("getbaseurl --> " + baseurl);
        return baseurl;
    }
    sethost (h) {
        this.details.host = h;
        console.log("host : " + this.details.host);
    }
    gethost () {
        return this.details.host;
    }
    hasCoordinates () {
        var result = "";
        result = this.getParameterByName('zoom', this.details.mlposition);
        return result === "" ? false : true;
    }
    lon () {
        return this.getParameterByName('lon', this.details.mlposition);
    }
    lat () {
        return this.getParameterByName('lat', this.details.mlposition);
    }
    zoom () {
        return this.getParameterByName('zoom', this.details.mlposition);
    }
    setConfigParams (config : IConfigParams) {
        this.details.mlposition.lon = config.mlposition.lon;
        this.details.mlposition.lat = config.mlposition.lat;
        this.details.mlposition.zoom = config.mlposition.zoom;
        this.details.mapId = config.mapId;
        this.details.mapType = config.mapType;
        this.details.webmapId = config.webmapId;
    }
    getConfigParams () : IConfigParams {
        return {
            "mapId" : this.details.mapId,
            "webmapId" : this.details.webmapId,
            "mapType" : this.details.mapType,
            "mlposition" : {
                "lon" : this.details.mlposition.lon,
                "lat" : this.details.mlposition.lat,
                "zoom" : this.details.mlposition.zoom}
            }
    }

    setPosition (position : IPosition) {
        this.details.mlposition.lon = position.lon;
        this.details.mlposition.lat = position.lat;
        this.details.mlposition.zoom = position.zoom;
    }
    getPosition () : IPosition {
    //     return new MLPosition({
    //             "lon" : this.details.mlposition.lon,
    //             "lat" : this.details.mlposition.lat,
    //             "zoom" : this.details.mlposition.zoom
    //         })
            return new MLPosition(this.details.mlposition.lon, this.details.mlposition.details.lat, this.details.mlposition.details.zoom);
    }

    setQuery (q) {
        this.details.query = q;
    }
    query () {
        return this.getParameterByName('gmquery', this.details);
    }
    getQueryFromUrl () {
        // this.details.query.push(this.getParameterByName('gmquery'));
        return this.details.query;
    }
    getBoundsForUrl () {
        var bnds = this.details.bounds,
            bndsUrl = "&llx=" + bnds.llx + "&lly=" + bnds.lly + "&urx=" + bnds.urx + "&ury=" + bnds.ury;
        return bndsUrl;
    }
    getBoundsFromUrl () {
        var llx = this.getParameterByName('llx'),
            lly = this.getParameterByName('lly'),
            urx = this.getParameterByName('urx'),
            ury = this.getParameterByName('ury');
        return {'llx' : llx, 'lly' : lly, 'urx' : urx, 'ury' : ury};
    }
    getSmallFormDimensions () {
        var d = this.details.smallFormDimensions,
            ltwh = 'top=${d.top}, left=${d.left}, height=${d.height}, width=${d.width}';
        return ltwh;
    }
    setBounds (bnds) {
        this.details.bounds = bnds;
    }
    getBounds () {
        return this.details.bounds;
    }
    setInjector (inj) {
        this.details.nginj = inj;
    }
    getInjector () {
        return this.details.nginj;
    }
    setStartupView (sum, site) {
        this.details.startupView.summaryShowing = sum;
        this.details.startupView.websiteDisplayMode = site;
    }
    getStartupView () {
        return this.details.startupView;
    }
    showConfigdetails (msg) {
        console.log(msg);
        console.log(
            'isInitialUser ' + this.details.isInitialUser + "\n" +
                "referrerId : "  + this.details.referrerId + "\n" +
                "locationPath : "  + this.details.locationPath + "\n" +
                "host : "  + this.details.host + "\n" +
                "hostport : "  + this.details.hostport + "\n" +
                "href : "  + this.details.href + "\n"  +
                "search : "  + this.details.search + "\n" +
                "maphost : "  + this.details.maphost + "\n" +
                "webmapId : "  + this.details.webmapId + "\n" +
                "masherChannel : "  + this.details.masherChannel + "\n" +
                "lon :" + this.details.mlposition.lon + '\n' +
                "lat : " + this.details.mlposition.lat + "\n" +
                "zoom : " + this.details.mlposition.zoom +
                "startupView.summaryShowing : " + this.details.startupView.summaryShowing + ", startupView.websiteDisplayMode : " + this.details.startupView.websiteDisplayMode
        );
    }
        // staticMethods.showConfigthis.details = showConfigthis.details;


        // setInjector(angular.element(document.body).injector());
}
