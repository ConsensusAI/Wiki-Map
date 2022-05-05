var map = L.map("map").setView([51.505, -0.09], 13);
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

// Click Event
let clickedMapPopup = L.popup();

let latlng;
function onMapClick(e) {
  latlng = e.latlng;
  let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

  clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(map);
}

let testID = 665;

// Save point on map (creates a new marker and add to points table)
function saveMarker(latlng) {
  let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  let lat = latlng.lat;
  let lng = latlng.lng;
  let formContent = `<div class="form-group">
  <label for="newMapName">Map Name</label>
  <input type="newMapName" id="test" class="form-control" name="newMapName" placeholder="My Favourite Map">
</div>
<div class="form-check">
  <input type="checkbox" class="form-check-input" name="privateMap" id="privateMap">
  <label class="form-check-label" for="privateMap">Private Map</label>
</div>
<button type="submit" class="btn btn-primary">Next</button>
`;

  {
    /* <input type="checkbox" class="form-check-input" name="privateMap" id="privateMap">
        <label class="form-check-label" for="privateMap">Private Map</label> */
  }
  tempMarker.bindPopup(formContent).openPopup();

  let private = false;

  $("input[type=checkbox]").click(function () {
    private = true;
  });

  $("button[type=submit]").click(function () {
    let mapName = $("input[type=newMapName]").val();
    console.log(mapName);
    console.log(private);
    let content = `<div class="form-group">
    <label for="pointTitle">Point Title: </label>
    <input type="pointTitle" id="test" class="form-control" name="pointTitle" placeholder="Burger Joint">
  </div>
  <div class="form-group">
  <label for="pointDesc">Description: </label>
  <input type="pointDesc" id="test" class="form-control" name="pointDesc" placeholder="Best place to eat">
</div>
<button type="submit" class="btn btn-primary">Create Map!</button>`;
    tempMarker.bindPopup(content).openPopup();
  });

  // let mapName = prompt("Please enter the map name", "(New Map)");
  // let title = prompt("Please enter the title", "Write...");
  // let desc = prompt("Brief description", "Write...");
  let newPointId = testID + 1;
  // let content = `<p>${title}</p></br><p>${desc}</p></br><button onclick="clearMarker(${newIdPoint})">Remove</button>`;
  tempMarker._id = newIdPoint;
  // markers.push(tempMarker);

  // Implement on Database - points table
  // points.push({
  //   id: newIdPoint,
  //   title: title,
  //   description: desc,
  //   lat: latlng.lat,
  //   lng: latlng.lng,
  //   map_id: map_id,
  // });

  // loadPoints();
  console.log("<<saveMarkers>> markers: ", markers, " --- points: ", points);
}

function showPopup(id) {
  markers.forEach((m) => {
    if (m._id === id) {
      m.openPopup();
    }
  });
}

map.on("click", onMapClick);
