// Client facing scripts here

// dummy database
let user_id = 1;
let mapObj = {
  map_id: 1,
  title: 'Ottawaa',
  lat: 45.4236237996463,
  lng: -75.70106847644017,
  public: true,
  created_by: 1
}
let points = [
  {
    lat: 45.4236237996463,
    lng: -75.70106847644017
  },
  {
    lat: 45.436767,
    lng: -75.739633
  }
]
//// Map ////

let map = L.map("map").setView([mapObj.lat, mapObj.lng], 13);

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

// Marker - implement for loop to include in the map
L.marker([points[0].lat, points[0].lng]).addTo(map);
L.marker([points[1].lat, points[1].lng]).addTo(map);

// Circle
// var circle = L.circle([45.42, -75.7], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(map);

// Popups
// marker
//   .bindPopup("<b>Welcome to our map!!</b><br>This is Parliament Hill.")
//   .openPopup();

// Click Event

let clickedMapPopup = L.popup();

function onMapClick(e) {

  // Check if point exists
  // Implement - if true show option to delete...

  clickedMapPopup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng)
    .openOn(map);

  if (confirm("Do you want to save this location?")) {
    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    points.push({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    });
  }

  console.log(points);
}



map.on("click", onMapClick);
