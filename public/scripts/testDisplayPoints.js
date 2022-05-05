// Set up map
// $.ajax("/maps")

// $.ajax({
//   url: "/maps",
//   success: function (json) {
//     addMapsList(json);
//   },
// });

$(() => {
  let MAP;

  $.ajax("/maps").then((res) => {
    addMapsList(res);
    let currentMap = res["maps"][0];
    console.log("currmap", currentMap);
    // lat = 51.505;
    // lng = -0.09;
    lat = currentMap.lat;
    lng = currentMap.lng;
    renderMap(lat, lng);
    // MAP = L.map("map").setView([
    //   Number(currentMap.lat),
    //   Number(currentMap.lng),
    //   13,
    // ]);
    // L.tileLayer(
    //   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: "mapbox/streets-v11",
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken:
    //       "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g",
    //   }
    // ).addTo(MAP);

    // MAP.on("click", onMapClick);

    // // // Click Event
    // let clickedMapPopup = L.popup();

    // function onMapClick(e) {
    //   latlng = e.latlng;
    //   let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

    //   clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(MAP);
    // }
  });
});

const renderMap = (lat, lng) => {
  let map = L.map("map").setView([lat, lng], 13);

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

  let marker = L.marker([45.42, -75.7]).addTo(map);

  // Click Event
  let clickedMapPopup = L.popup();

  function testClick() {
    prompt("Test");
  }

  let latlng;
  function onMapClick(e) {
    latlng = e.latlng;
    let popContent = `<p>Clicked on: ${e.latlng.lat},  ${e.latlng.lng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

    clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(map);
  }

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
  }

  map.on("click", onMapClick);
};

// $.ajax("/maps").then((res) => {
//   addMapsList(res);
// });

// $.ajax({
//   url: "/maps/points",
//   success: function (json) {
//     addPointsList(json);
//   },
// });

$.ajax({
  url: "/maps/pointsByMap",
  success: function (json) {
    newAddPoints(json);
  },
});

const newAddPoints = (pointsJson) => {
  let points = pointsJson["points"];
  for (let point in points) {
    console.log("newAddPoints", points[point]);
    let node = document.createElement("li");
    let nodeText = document.createTextNode(points[point].title);
    node.setAttribute("onclick", `showPopup(${points[point].id})`);
    node.appendChild(nodeText);
    document.getElementById("map-points").appendChild(node);
  }
};

const addMapsList = (mapsJson) => {
  let maps = mapsJson["maps"];
  for (let map in maps) {
    $("#maps-list").append(`<li>${maps[map]["title"]}</li>`);
    console.log("map", map);
  }
};

const addPointsList = (pointsJson) => {
  let points = pointsJson["points"];
  for (let point in points) {
    $("#map-points").append(`<li>${points[point]["title"]}</li>`);
  }
};

// IMPORTANT
// console.log("result:", result["maps"][0]);

// // Views
// $(() => {
//   const $mapsList = $("#maps-list");

//   window.views_manager = {};

//   window.views_manager.show = () => {
//     $mapsListings.appendTo($mapsList);
//   };
// });

// // Index
// $(() => {
//   getAllMaps.then(function (json) {
//     mapsListings.addMapsToList(json.maps);
//     views_manager.show();
//   });
// });

// $(() => {
//   window.mapsListing = {};

//   function createListing(map) {
//     return `<li>${map.title}</li>`;
//   }

//   window.mapsListing.createListing = createListing;
// });

// $(() => {
//   const $mapsListings = $(`
//   <div class="test-listings" id="test-listings">
//   <p>Loading...</p>
//   >/div>`);
//   window.$mapsListings = $mapsListings;

//   window.mapsListings = {};

//   function addMapListing(listing) {
//     $mapsListings.append(listing);
//   }

//   function clearListing() {
//     $mapsListings.empty();
//   }
//   window.mapsListings.clearListing = clearListing;

//   function addMapsToList(maps) {
//     clearListing();
//     for (const mapId in maps) {
//       const map = maps[mapId];
//       console.log(mapId);
//       const listing = mapsListing.createListing(map);
//       addMapListing(listing);
//     }
//   }
// });
