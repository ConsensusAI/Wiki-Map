const addFavouriteMapsList = (mapsJson) => {
  let maps = mapsJson["favouriteMaps"];
  for (let favouriteMap in maps) {
    console.log(maps[favouriteMap]);
    $("#favourited-maps")
      .append(`<li>${maps[favouriteMap]["title"]}</li>`)
      .click(function () {
        alert("Handler for .click() called.");
      });
    // node.click(`loadMapId(${m.id}, ${index})`);   // finish later
  }
};

function loadFavouriteMaps() {
  $("#favourited-maps").html("");
  $.ajax({
    url: "/maps/favourites",
    success: function (json) {
      addFavouriteMapsList(json);
      // console.log(json["favouriteMaps"][0]);
    },
  });
}

const addContributionsList = (mapsJson) => {
  let maps = mapsJson["contributedMaps"];
  for (let contributedMap in maps) {
    console.log(maps[contributedMap]);
    $("#contributed-maps")
      .append(`<li>${maps[contributedMap]["title"]}</li>`)
      .click(function () {
        alert("Handler for .click() called.");
      });
    // node.click(`loadMapId(${m.id}, ${index})`);   // finish later
  }
};

function loadContributions() {
  $("#contributed-maps").html("");
  $.ajax({
    url: "/maps/contributions",
    success: function (json) {
      addContributionsList(json);
      console.log("==========");
      console.log(json);
    },
  });
}

loadFavouriteMaps();
loadContributions();
