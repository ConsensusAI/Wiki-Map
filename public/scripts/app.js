// require("dotenv").config();

// Client facing scripts here

// dummy database
let user_id = 1;
let map_id = 1;

let maps = [
  {
    id: 1,
    title: 'Best Places in Ottawa',
    lat: 45.4236237996463,
    lng: -75.70106847644017,
    public: true,
    created_by: 1
  },
  {
    id: 2,
    title: 'Best Places in Montreal',
    lat: 45.507189,
    lng: -73.583097,
    public: true,
    created_by: 1
  },
  {
    id: 3,
    title: 'Best Places in Toronto',
    lat: 45.507189,
    lng: -73.583097,
    public: true,
    created_by: 2
  }
];

// let mapObj = {
//   map_id: 1,
//   title: 'Best Places in Ottawa',
//   lat: 45.4236237996463,
//   lng: -75.70106847644017,
//   public: true,
//   created_by: 1
// }

let points = [
  {
    id: 1,
    title: 'Point1',
    description: 'description1...',
    lat: 45.4236237996463,
    lng: -75.70106847644017,
    map_id: 1
  },
  {
    id: 2,
    title: 'Point2',
    description: 'description2...',
    lat: 45.436767,
    lng: -75.739633,
    map_id: 1
  },
  {
    id: 3,
    title: 'Point3',
    description: 'description3...',
    lat: 45.436767,
    lng: -75.759633,
    map_id: 2
  }
]
//// Map ////
document.getElementById("map-title").innerHTML = maps[0].title;
let map = L.map("map").setView([maps[0].lat, maps[0].lng], 13);
let markers = [];
let latlng;

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
    accessToken: "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g"
  }
).addTo(map);

// Maps - Load Maps available for user
function loadMaps() {
  document.getElementById("maps-list").innerHTML = "";
  maps.map((m, index) => {
    if (m.created_by === user_id) {
      let node = document.createElement("li");
      let nodeText = document.createTextNode(m.title);
      node.setAttribute("onclick", `loadMapId(${m.id}, ${index})`);
      node.appendChild(nodeText);
      document.getElementById("maps-list").appendChild(node)
    }
  });
}
loadMaps();

function loadMapId (id, index) {
  map_id = id;
  document.getElementById("map-title").innerHTML = maps[index].title;
  map.setView([maps[index].lat, maps[index].lng], 13);
};

// Markers - Load Map initial state
points.map(p => {
  if (p.map_id === map_id) {
    console.log(p);
    let tempMarker = L.marker([p.lat, p.lng]).addTo(map);
    let content = `<p>${p.title}</p></br><p>${p.description}</p></br><button onclick=clearMarker(${p.id})>Remove</button>`;
    tempMarker._id = p.id;
    markers.push(tempMarker);
    tempMarker.bindPopup(content);
  }
});

// Reload the list of points
function loadPoints() {
  document.getElementById("map-points").innerHTML = "";
  points.map(p => {
    if (p.map_id === map_id) {
      let node = document.createElement("li");
      let nodeText = document.createTextNode(p.title);
      node.appendChild(nodeText);
      document.getElementById("map-points").appendChild(node)
    }
  });
}

loadPoints();

console.log("markers: ", markers);

// Click Event
let clickedMapPopup = L.popup();

function onMapClick(e) {
  latlng = e.latlng;
  let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

  clickedMapPopup
    .setLatLng(e.latlng)
    .setContent(popContent)
    .openOn(map);

  console.log(e);
  console.log(markers);
}

// Save point on map
function saveMarker(latlng) {
  let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  let title = prompt("Please enter the title", "Write...");
  let desc = prompt("Brief description", "Write...");
  // new ID
  let newId = 0;
  if (markers.length > 0) {
    newId = markers[markers.length - 1]._id + 1
  }

  let content = `<p>${title}</p></br><p>${desc}</p></br><button onclick=clearMarker(${newId})>Remove</button>`;
  tempMarker._id = newId;
  markers.push(tempMarker);
  tempMarker.bindPopup(content).openPopup();

  // Implement on Database - points table
  points.push({
    id: Object.keys(points).length + 1,
    title: title,
    description: desc,
    lat: latlng.lat,
    lng: latlng.lng
  });
  console.log(points);
  loadPoints();
}

// Clear marker
function clearMarker(id) {
  let newMarkers = [];

  markers.forEach(m => {
    if (m._id === id) {
      m.remove();
    } else {
      newMarkers.push(m);
    }
  })
  markers = newMarkers;
  console.log("markers: ", markers);

  points.forEach((p, index) => {
    if (p.id === id) {
      points.splice(index,1);
    }
  });
  console.log("points: ", points);
  loadPoints();
}

map.on("click", onMapClick);


