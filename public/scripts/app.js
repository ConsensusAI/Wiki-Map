// require("dotenv").config(); Ask Taiwo how to config this...


// dummy database
let user_id = 1;
let user_email = 'alice@gmail.com';

// let mapsDB = getMapsByUser(user_email);
// console.log(mapsDB);

// let maps2 = [];
// $(() => {
//   $.ajax('/maps')
//     .then(res => res.maps)

// });

// let maps = [
//   {
//     id: 1,
//     title: 'Best Places in Ottawa',
//     lat: 45.4236237996463,
//     lng: -75.70106847644017,
//     public: true,
//     created_by: 1
//   },
//   {
//     id: 2,
//     title: 'Best Places in Montreal',
//     lat: 45.508091,
//     lng: -73.599874,
//     public: true,
//     created_by: 1
//   },
//   {
//     id: 3,
//     title: 'Best Places in Toronto',
//     lat: 43.642555,
//     lng: -79.387109,
//     public: true,
//     created_by: 2
//   }
// ];

let points = [
  {
    id: 1,
    title: 'Point1',
    description: 'description1...',
    lat: 45.4236237996463,
    lng: -75.70106847644017,
    image: '',
    map_id: 1
  },
  {
    id: 2,
    title: 'Point2',
    description: 'description2...',
    lat: 45.436767,
    lng: -75.739633,
    image: '',
    map_id: 1
  },
  {
    id: 3,
    title: 'Point3',
    description: 'description3...',
    lat: 45.508091,
    lng: -73.599874,
    image: '',
    map_id: 2
  },
  {
    id: 4,
    title: 'Point4',
    description: 'description4...',
    lat: 45.409357,
    lng: -75.719346,
    image: '',
    map_id: 1
  },
  {
    id: 5,
    title: 'CN Tower',
    description: 'Most iconic tower of Canada.',
    lat: 43.642555,
    lng: -79.387109,
    image: 'https://media.istockphoto.com/photos/tower-picture-id483465910', //https://media.istockphoto.com/photos/tower-picture-id483465910
    map_id: 3
  },
  {
    id: 6,
    title: 'High Park',
    description: 'The High Park is one of the biggest parks in the Toronto region.',
    lat: 43.645905,
    lng: -79.463374,
    image: 'https://media.istockphoto.com/photos/toronto-postcard-picture-id803293832?s=612x612', //https://media.istockphoto.com/photos/toronto-postcard-picture-id803293832?s=612x612
    map_id: 3
  },
]


$(() => {

  let map;
  let markers = [];
  let userMaps = [];

  $.ajax('/maps')
    .then(res => {
      res.maps.map((m, index) => {
        if(m.created_by === user_id) {

          // Start map by default: first map found for each user
          if(userMaps.length === 0) {
            map_id = m.id;
            $("#map-title").html(m.title);
            map = L.map("map").setView([Number(m.lat), Number(m.lng)], 13);
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
              ).addTo(map)

              map.on("click", onMapClick);
          }
          userMaps.push([m.id, index]);
        }
        console.log(Number(m.lat), Number(m.lng));
      })
    })

  // // Click Event
  let clickedMapPopup = L.popup();

  let latlng;
  function onMapClick(e) {
    latlng = e.latlng;
    let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

    clickedMapPopup
      .setLatLng(e.latlng)
      .setContent(popContent)
      .openOn(map);
  }











});


// // Map - initialize on "map"
// let userMaps = [];
// maps.forEach((m, index) => {
//   if(m.created_by === user_id) {
//     userMaps.push([m.id, index]);
//   }
// });

// // By default we are displaying the first map found for each user
// map_id = userMaps[0][0];
// document.getElementById("map-title").innerHTML = maps[userMaps[0][1]].title;
// map = L.map("map").setView([maps[userMaps[0][1]].lat, maps[userMaps[0][1]].lng], 13);
// let markers = [];

// Tile Layer
// L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g"
//   }
// ).addTo(map);

// loadMaps(); // List of maps for the user e.g. Best Places in Ottawa/Montreal
// loadMarkers(); // Place the markers in the map from points table
// loadPoints(); // List of points(places) saved on the map e.g. Point1, Point2, etc

// console.log("markers: ", markers, " --- points: ", points);

// // // Click Event
// let clickedMapPopup = L.popup();

// let latlng;
// function onMapClick(e) {
//   latlng = e.latlng;
//   let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

//   clickedMapPopup
//     .setLatLng(e.latlng)
//     .setContent(popContent)
//     .openOn(map);

// }


// Functions here -------------------------------------------------------------------------------------------

// List of Maps (Ottawa, Montreal, etc)
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

// List of points saved on the map (Point1, Point2, etc)
function loadPoints() {
  document.getElementById("map-points").innerHTML = "";
  /*$.ajax(url)
  .then(res => {
    res.points.map(p => {
      if (p.map_id === map_id) {
        let node = document.createElement("li");
        let nodeText = document.createTextNode(p.title);
        node.setAttribute("onclick", `showPopup(${p.id})`);
        node.appendChild(nodeText);
        document.getElementById("map-points").appendChild(node)
      }
    });
  })*/
  points.map(p => {
    if (p.map_id === map_id) {
      let node = document.createElement("li");
      let nodeText = document.createTextNode(p.title);
      node.setAttribute("onclick", `showPopup(${p.id})`);
      node.appendChild(nodeText);
      document.getElementById("map-points").appendChild(node)
    }
  });
}

// Markers on the map from points table
function loadMarkers() {
  points.map((p) => {
    if (p.map_id === map_id) {
      console.log(p);
      let tempMarker = L.marker([p.lat, p.lng]).addTo(map);
      let content =
        `<p>${p.title}</p>
        </br>
        <p>${p.description}</p>
        </br>
        <img src="${p.image}" style="width:150px;height:150px;">
        <button onclick="clearMarker(${p.id})">Remove</button>`;
      tempMarker._id = p.id;
      markers.push(tempMarker);
      tempMarker.bindPopup(content);
    }
  });
}

// Load a new selected Map by ID - it loads again the markers and points
function loadMapId(id, index) {
  map_id = id;
  document.getElementById("map-title").innerHTML = maps[index].title;
  map.setView([maps[index].lat, maps[index].lng], 13);
  markers = []; // reset markers array
  loadMarkers();
  loadPoints();
};

// Save point on map (creates a new marker and add to points table)
function saveMarker(latlng) {
  let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  let title = prompt("Please enter the title", "Write...");
  let desc = prompt("Brief description", "Write...");
  let newIdPoint = points[Object.keys(points).length - 1].id + 1;
  let content = `<p>${title}</p></br><p>${desc}</p></br><button onclick="clearMarker(${newIdPoint})">Remove</button>`;
  tempMarker._id = newIdPoint;
  markers.push(tempMarker);
  tempMarker.bindPopup(content).openPopup();

  // Implement on Database - points table
  points.push({
    id: newIdPoint,
    title: title,
    description: desc,
    lat: latlng.lat,
    lng: latlng.lng,
    map_id: map_id
  });

  loadPoints();
  console.log("<<saveMarkers>> markers: ", markers, " --- points: ", points);
}

// Clear marker
function clearMarker(idMarker) {
  // let newMarkers = [];

  markers.forEach((m, index) => {
    if (m._id === idMarker) {
      m.remove();
      markers.splice(index,1);
    }
  })
  // markers = newMarkers;
  console.log("markers: ", markers);

  points.forEach((p, index) => {
    if (p.id === idMarker) {
      points.splice(index,1);
    }
  });

  loadPoints();
  console.log("<<clearMarkers>> markers: ", markers, " --- points: ", points);
}

function showPopup(id) {
  markers.forEach(m => {
    if(m._id === id) {
      m.openPopup();
    }
  });
}

// map.on("click", onMapClick);


