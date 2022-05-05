function getAllMaps() {
  let url = "/maps";
  return $.ajax({
    url,
  });
}

function getAllPointsByUserAndMap() {
  return $.ajax("/points");
}

function getAllPointsByMap() {
  return $.ajax("/maps/pointsByMap");
}
