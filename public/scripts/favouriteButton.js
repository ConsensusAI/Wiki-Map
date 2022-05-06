$(document).ready(function () {
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
          $(".fave-button").addClass("btn-success");
          $(".fave-button").removeClass("btn-outline-success");
          $(".fave-button").html("Favourited!");
          console.log("YES");
        } else {
          console.log("NO");
        }
      }
      // $(".fave-button").click(clickFavourite); // <-------------------
    });
  });
});

$(".fave-button").hover(toggleHoverButton, toggleUnhoverButton);

function clickFavourite() {
  let buttonClass =
    $(".fave-button").text() === "Unfavourite?"
      ? "btn-outline-danger"
      : "btn-success";
  $(".fave-button").toggleClass(buttonClass);
  let buttonClass2 =
    $(".fave-button").text() === "Unfavourite?"
      ? "btn-outline-success"
      : "btn-success";
  $(".fave-button").toggleClass(buttonClass2);
  let textToggle =
    $(".fave-button").text() === "Unfavourite?"
      ? "Favourite Map"
      : "Favorited!";
  $(".fave-button").empty();
  $(".fave-button").text(textToggle);
}

function toggleHoverButton() {
  let buttonClass =
    $(".fave-button").text() === "Favourited!"
      ? "btn-success"
      : "btn-outline-success";
  $(".fave-button").toggleClass(buttonClass);
  let buttonClass2 =
    $(".fave-button").text() === "Favourited!"
      ? "btn-outline-danger"
      : "btn-success";
  $(".fave-button").toggleClass(buttonClass2);
  let textToggler =
    $(".fave-button").text() === "Favourited!" ? "Unfavourite?" : "Favourite?";
  $(".fave-button").text(textToggler);
}

function toggleUnhoverButton() {
  let buttonClass =
    $(".fave-button").text() === "Unfavourite?"
      ? "btn-outline-danger"
      : "btn-success";
  $(".fave-button").toggleClass(buttonClass);
  let buttonClass2 =
    $(".fave-button").text() === "Unfavourite?"
      ? "btn-success"
      : "btn-outline-success";
  $(".fave-button").toggleClass(buttonClass2);
  let textToggler =
    $(".fave-button").text() === "Unfavourite?"
      ? "Favourited!"
      : "Favourite Map";
  $(".fave-button").text(textToggler);
}
