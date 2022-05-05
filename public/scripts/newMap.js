let DEFAULT_IMAGE =
  "https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png";

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
  let popContent = `<p>Clicked on: Latitude: ${latlng.lat}, Longitude: ${latlng.lng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

  clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(map);
}

let testID = 665;

// Save point on map (creates a new marker and add to points table)
function saveMarker(latlng) {
  let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
  let lat = latlng.lat;
  let lng = latlng.lng;
  let pointTitle;
  let pointDesc;
  let newPointId;
  let formContent = `<form action="/maps/new" method="POST">
  <div hidden class="form-group">
  <input type="hiddenlat" class="form-control" name="hiddenlat" value="${lat}">
  <input type="hiddenlng" class="form-control" name="hiddenlng" value="${lng}">
  </div>
  <div class="mapForm">
  <div class="form-group">
  <label for="newMapName">Map Name</label>
  <input type="newMapName" class="form-control" name="newMapName" placeholder="My Favourite Map">
</div>
<div class="form-check">
  <input type="checkbox" class="form-check-input" name="privateMap" id="privateMap">
  <label class="form-check-label" for="privateMap">Private Map</label>
</div>
<button type="submit" class="btn btn-primary">Next</button>
</div>
<div hidden class="pointsForm">
<div class="form-group">
    <label for="pointTitle">Point Title: </label>
    <input type="pointTitle" class="form-control" name="pointTitle" placeholder="Burger Joint">
  </div>
  <div class="form-group">
  <label for="pointDesc">Description: </label>
  <input type="pointDesc" class="form-control" name="pointDesc" placeholder="Best place to eat">
  <div class="form-group">
  <label for="pointURL">Description: </label>
  <input type="pointURL" class="form-control" name="pointURL" value=${DEFAULT_IMAGE}>
</div>
<button type="createMap" class="btn btn-primary">Create Map!</button>
</div>
</form>
<div hidden class="displayPoint">
</div>
`;

  tempMarker.bindPopup(formContent).openPopup();

  let private = false;

  $("input[type=checkbox]").click(function () {
    private = true;
  });

  $("button[type=submit]").click(function () {
    let mapName = $("input[type=newMapName]").val();
    console.log(mapName);
    console.log(private);
    $(".mapForm").hide();
    $(".pointsForm").show();
  });

  $("button[type=createMap]").click(function () {
    let pointTitle = $("input[type=pointTitle]").val();
    let pointDesc = $("input[type=pointDesc]").val();
    let pointURL = $("input[type=pointURL]").val();
    let newPointId = testID + 1;
    console.log(pointTitle);
    console.log(pointDesc);
    console.log(pointURL);
    $(".pointsForm").hide();
    $(".displayPoint").show();
    let stuff = `<p>${pointTitle}</p>
    </br>
    <p>${pointDesc}</p>
    </br>
    <img src="${pointURL}" style="width:150px;height:150px;">
    <button onclick="clearMarker(${15})">Remove</button>`;
    $(".leaflet-popup-content").append(stuff);
  });
}

function showPopup(id) {
  markers.forEach((m) => {
    if (m._id === id) {
      m.openPopup();
    }
  });
}

map.on("click", onMapClick);
