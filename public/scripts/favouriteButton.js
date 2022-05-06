$.ajax("/cookies").then((res) => {
  let mapId = res.mapId;
  console.log(res);
  $.ajax("/maps/favourites").then((res) => {
    let allFavouriteMaps = res["favouriteMaps"];
    console.log(allFavouriteMaps);
    console.log(mapId);
    for (let index in allFavouriteMaps) {
      let faveMap = allFavouriteMaps[index];
      if (faveMap.id == mapId) {
        console.log("YES");
      } else {
        console.log("NO");
      }
    }
  });
});
