const addFavouriteMapsList = (mapsJson) => {
  let maps = mapsJson["favouriteMaps"];
  for (let favouriteMap in maps) {
    console.log(maps[favouriteMap]);
    $("#contributed-maps")
      .append(`<li>${maps[favouriteMap]["title"]}</li>`)
      .click(function () {
        alert("Handler for .click() called.");
      });
    // node.click(`loadMapId(${m.id}, ${index})`);   // finish later
  }
};

function loadFavouriteMaps() {
  $("#contributed-maps").html("");
  $.ajax({
    url: "/maps/favourites",
    success: function (json) {
      addFavouriteMapsList(json);
      // console.log(json["favouriteMaps"][0]);
    },
  });
}

loadFavouriteMaps();
