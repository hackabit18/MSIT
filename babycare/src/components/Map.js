import React, { Component } from 'react';
import '../css/map.css';


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
