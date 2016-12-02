// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1Ijoiam9ubWFydGluZGVsbCIsImEiOiJjaXcyZWZzeGQwYmY0MnlvdXh3Y2RobGN0In0.mdqG2-mAIb2kXHNhg8rohQ';
// Create a map in the div #map
var map = L.mapbox.map('map', 'mapbox.streets-satellite')
  .setView([40.143192, -83.030474], 14);

var metro_parks = new L.LayerGroup()
metro_parks.addTo(map);

// Grab all tilesets from MetroParks Style
var request = new XMLHttpRequest();
request.open('GET', 'https://api.mapbox.com/styles/v1/jonmartindell/ciw2jbamg004i2kqmpxbyhy91?access_token='+L.mapbox.accessToken, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var resp = request.responseText;
    for (var map in JSON.parse(resp)["sources"]) {
      tile_name = map.replace("mapbox://", "");
      console.log("adding tile: "+tile_name);
      L.mapbox.tileLayer(tile_name, {format: 'png256'}).addTo(metro_parks);
    }
  } else {
    // We reached our target server, but it returned an error
    alert(request.responseText);
  }
};
request.onerror = function() {
  alert("error fetching metro parks style");
};
request.send();

// L.mapbox.tileLayer('jonmartindell.4y4fn9ud', {format: 'png256'}).addTo(metro_parks);
// L.mapbox.tileLayer('jonmartindell.8ny1cekb', {format: 'png256'}).addTo(metro_parks);
// L.mapbox.tileLayer('jonmartindell.b0tb48ym', {format: 'png256'}).addTo(metro_parks);
// L.mapbox.tileLayer('jonmartindell.4k9rucwr', {format: 'png256'}).addTo(metro_parks);
// L.mapbox.tileLayer('jonmartindell.d0zjvmth', {format: 'png256'}).addTo(metro_parks);

// Geolocation Stuff
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

// Slider opacity filter
function updateOpacity(value) {
  metro_parks.eachLayer(function (layer) {
    layer.setOpacity(value);
  });
}

// var satellite_tile = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9ubWFydGluZGVsbCIsImEiOiJjaXcyZWZzeGQwYmY0MnlvdXh3Y2RobGN0In0.mdqG2-mAIb2kXHNhg8rohQ', {
//   attribution: '&copy; Mapbox &copy; OpenStreetMap contributors',
//   maxZoom: 18
// });
//
// var streets_tile = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9ubWFydGluZGVsbCIsImEiOiJjaXcyZWZzeGQwYmY0MnlvdXh3Y2RobGN0In0.mdqG2-mAIb2kXHNhg8rohQ', {
//   attribution: '&copy; Mapbox &copy; OpenStreetMap contributors',
//   maxZoom: 18
// });
//
// var parks = new L.LayerGroup();
// L.tileLayer('https://api.mapbox.com/styles/v1/jonmartindell/ciw2jbamg004i2kqmpxbyhy91/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9ubWFydGluZGVsbCIsImEiOiJjaXcyZWZzeGQwYmY0MnlvdXh3Y2RobGN0In0.mdqG2-mAIb2kXHNhg8rohQ', {
//   attribution: '&copy; Mapbox &copy; OpenStreetMap contributors',
//   maxZoom: 18
// }).setOpacity(1.0).addTo(parks);
//
// var map = L.map('map', {
//   layers: [satellite_tile] // only add one!
// }).setView([40.116667, -82.963611], 13);
//
// var baseLayers = {
//   "Streets": streets_tile,
//   "Satellite": satellite_tile
// };
//
// var overlays = {
//   "Parks": parks
// };
//
// L.control.layers(baseLayers, overlays).addTo(map);
//
