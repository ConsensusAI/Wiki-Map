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
    console.log("map", maps[map]);
  }
};

const addPointsList = (pointsJson) => {
  let points = pointsJson["points"];
  for (let point in points) {
    $("#map-points").append(`<li>${points[point]["title"]}</li>`);
  }
};

$(() => {
  getAllMaps().then((mapsJson) => {
    addMapsList(mapsJson);
  });

  getAllPointsByMap().then((pointsJson) => {
    addPointsList(pointsJson);
  });
});
