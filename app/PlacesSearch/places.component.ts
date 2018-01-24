
import {} from 'google';
import { Component, NgZone, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormsModule} from '@angular/forms'
// import { Map } from '@agm/core';
// import {} from '@types/googlemaps';
import { MouseEvent } from '@agm/core';

// declare var google;

@Component({
  selector: 'places-for-maplinkr',
  template: require('./places.component.html'),
  styles: [ require('./places.component.css')]
})
export class PlacesSearchComponent implements AfterViewInit {
    @ViewChild("searchBox")
    searchBoxRef: ElementRef;
    // public searchBox : any;
    // public input : any;

  // constructor(private map : google.maps.Map, private _ngZone: NgZone)
  constructor(private _ngZone: NgZone) {

      // Create the search box and link it to the UI element.
      // this.input = document.getElementById('pac-input');
      // this.searchBox = new google.maps.places.SearchBox(this.input);
      /*
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        this.searchBox.setBounds(map.getBounds());
      });
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      this.searchBox.addListener('places_changed', function() {
        var places = this.searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        else {
          this.placeMarkers(map, places);
          return;
        }
      });
      */

  }

  ngAfterViewInit() {
      let input: any = this.searchBoxRef.nativeElement;
      console.log(this.searchBoxRef);
      var searchBox = new google.maps.places.SearchBox(input);
      // this.input = document.getElementById('pac-input');
      // this.searchBox = new google.maps.places.SearchBox(this.input);
      searchBox.addListener("places_changed", () => {
        this._ngZone.run(() => {
          console.log('listening');
          console.log(searchBox);
          var places = searchBox.getPlaces();
          console.log(places);
          if (places.length == 0) {
            return;
          }
        })
      });
    }
 placeMarkers(map, places) {

        var markers = [];

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        };
    }
