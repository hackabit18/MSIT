import React, { Component } from 'react';
import './map.css';


class Map extends Component {

  componentDidMount(){
    this.renderMap();

  }
  renderMap=()=>{
     loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kxOQBen7WGGK80Ou0oSa_esnivbUtYQ&libraries=places&callback=initMap");
     window.initMap=this.initMap;
  }
  initMap=()=>{
    if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert('geolocation not supported');
}

function error(msg) {
alert('error: ' + msg);
}      function success(position) {
var pos = {
  lat: position.coords.latitude,
  lng: position.coords.longitude
  };
  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 13
  });

  var marker = new window.google.maps.Marker({
    map: map,
    position:pos,
    icon:{                    path:window.google.maps.SymbolPath.CIRCLE,
                              fillColor: '#4285F4',
                              fillOpacity: 1,
                              strokeColor: 'white',
                              strokeWeight: 1,
                              scale: 10,
                              optimized: false,
                              size: new window.google.maps.Size(100, 60),
                               scaledSize: new window.google.maps.Size(70, 60),
                               origin: new window.google.maps.Point(-15,0)
                            }

  });
  var infowindow1 = new window.google.maps.InfoWindow();
  window.google.maps.event.addListener(marker, 'click', function() {
    infowindow1.setContent('Your current location');
    infowindow1.open(map, this);
  });
  var service = new window.google.maps.places.PlacesService(map);
service.nearbySearch({
  location:pos,
  radius: 8000,
  type: ['hospital']
}, fetchHospitals);
function fetchHospitals(results,status){
  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
var infowindow1 = new window.google.maps.InfoWindow();
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new window.google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  window.google.maps.event.addListener(marker, 'click', function() {
    infowindow1.setContent(place.name);
    infowindow1.open(map, this);
  });
}


  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var types = document.getElementById('type-selector');
  var strictBounds = document.getElementById('strict-bounds-selector');

  map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new window.google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new window.google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new window.google.maps.Marker({
    map: map,
    anchorPoint: new window.google.maps.Point(0, -29),
    icon:{                    path:window.google.maps.SymbolPath.CIRCLE,
                              fillColor: '#4285F4',
                              fillOpacity: 1,
                              strokeColor: 'white',
                              strokeWeight: 1,
                              scale: 10,
                              optimized: false,
                              size: new window.google.maps.Size(100, 60),
                               scaledSize: new window.google.maps.Size(70, 60),
                               origin: new window.google.maps.Point(-15,0)
                            }

  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
      //giving the hospitals
      var service2 = new window.google.maps.places.PlacesService(map);
    service2.nearbySearch({
      location:place.geometry.location,
      radius: 3000,
      type: ['hospital']
    }, fetchHospitals);

    var infowindow2 = new window.google.maps.InfoWindow();
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker1 = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      window.google.maps.event.addListener(marker1, 'click', function() {
        infowindow2.setContent(place.name);
        infowindow2.open(map, this);
      });
    }


    }
    function fetchHospitals(results,status){
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  document.getElementById('use-strict-bounds')
      .addEventListener('click', function() {
        console.log('Checkbox clicked! New state=' + this.checked);
        autocomplete.setOptions({strictBounds: this.checked});
      });

}
}

  render() {
    return (
      <div className="App">
        <div className="pac-card" id="pac-card">
<div>
  <div id="title">
    Hospital Locator
  </div>
  <div id="type-selector" className="pac-controls">
    <input type="radio" name="type" id="changetype-all" defaultChecked="checked"/>
    <label htmlFor="changetype-all">All</label>

    <input type="radio" name="type" id="changetype-establishment"/>
    <label htmlFor="changetype-establishment">Establishments</label>

    <input type="radio" name="type" id="changetype-address"/>
    <label htmlFor="changetype-address">Addresses</label>

    <input type="radio" name="type" id="changetype-geocode"/>
    <label htmlFor="changetype-geocode">Geocodes</label>
  </div>
  <div id="strict-bounds-selector" className="pac-controls">
    <input type="checkbox" id="use-strict-bounds" value=""/>
    <label htmlFor="use-strict-bounds">Strict Bounds</label>
  </div>
</div>
<div id="pac-container">
  <input id="pac-input" type="text"
      placeholder="Enter a location"/>
</div>
</div>
<div id="map"></div>
<div id="infowindow-content">
<img src="" width="16" height="16" id="place-icon" alt/>
<span id="place-name"  className="title"></span><br/>
<span id="place-address"></span>



</div>

      </div>
    );
  }
}
function loadScript(url){
var index =window.document.getElementsByTagName('script')[0];
var script =window.document.createElement('script');
script.src=url;
script.defer=true;
script.async=true;
index.parentNode.insertBefore(script,index);


}


export default Map;
