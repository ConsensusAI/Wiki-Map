$.ajax("/cookies").then((res) => {
  let mapId = res.mapId;
  console.log(res);
  $.ajax("/maps/favourites").then((res) => {
    let allFavouriteMaps = res["favouriteMaps"];
    console.log(allFavouriteMaps);
    console.log(mapId);
    let isFave = false;
    for (let index in allFavouriteMaps) {
      let faveMap = allFavouriteMaps[index];
      if (faveMap.id == mapId) {
        letFave = true;
        $(".fave-button").addClass("btn-success");
        $(".fave-button").removeClass("btn-outline-success");
        $(".fave-button").html("Favourited!");
        console.log("YES");
        break;
      } else {
        console.log("NO");
      }
    }
    console.log(isFave);
    isFave ? console.log("yes, it is") : console.log("no, it isn't");
  });
});

$(".fave-button").hover(promptUnfavourite, printhi);

function promptUnfavourite() {
  $(".fave-button").addClass("unfave-question");
  $(".fave-button").addClass("btn-outline-danger");
  $(".fave-button").removeClass("btn-success");
  $(".fave-button").html("Unfavourite?");
}

function printhi() {
  $(".fave-button").removeClass("unfave-question");
  $(".fave-button").removeClass("btn-outline-danger");
  $(".fave-button").addClass("btn-success");
  $(".fave-button").html("Favourited!");
}
