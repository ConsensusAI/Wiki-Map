// $.ajax({
//   url: "/maps",
//   success: function (json) {
//     addMapsList(json);
//   },
// });

$.ajax({
  url: "/maps/points",
  success: function (json) {
    addPointsList(json);
  },
});

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
