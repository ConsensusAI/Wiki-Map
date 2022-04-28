// Client facing scripts here

//// Map ////

let map = L.map("map").setView([45.4236237996463, -75.70106847644017], 13);

// Tile Layer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g",
  }
).addTo(map);

// Marker

let marker = L.marker([45.4236237996463, -75.70106847644017]).addTo(map);

// Circle
var circle = L.circle([45.42, -75.7], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

// Popups

marker
  .bindPopup("<b>Welcome to our map!!</b><br>This is Parliament Hill.")
  .openPopup();

// Click Event

let clickedMapPopup = L.popup();

function onMapClick(e) {
  clickedMapPopup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng)
    .openOn(map);
}

map.on("click", onMapClick);
