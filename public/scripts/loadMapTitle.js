$.ajax("/selectedMap").then((res) => {
  let mapName = res["mapInfo"][0]["title"];
  $("#map-title").html(mapName);
});
