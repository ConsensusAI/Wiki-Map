$.ajax("/cookies").then((res) => {
  // let mapId = res.mapId;
  let mapId = 1;
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
        $(".fave-button").removeClass("unfavourited");
        $(".fave-button").addClass("favourited");
        $(".fave-button").html("Favourited!");
        console.log("YES");
      } else {
        console.log("NO");
      }
    }
    console.log(isFave);
    isFave ? console.log("yes, it is") : console.log("no, it isn't");
    $(".unfavourited").click(clickFavourite);
    $(".favourited").click(clickUnfavourite);
  });
});

$(".fave-button").hover(toggleHoverButton, toggleUnhoverButton);
// $(".favourited").hover(promptUnfavourite, isFavourited);
// $(".unfavourited").hover(promptFavourite, isUnfavourited);

// function promptUnfavourite() {
//   $(".fave-button").addClass("unfave-question");
//   $(".fave-button").addClass("btn-outline-danger");
//   $(".fave-button").removeClass("btn-success");
//   $(".fave-button").html("Unfavourite?");
// }

// function isFavourited() {
//   $(".fave-button").removeClass("unfave-question");
//   $(".fave-button").removeClass("btn-outline-danger");
//   // $(".fave-button").addClass("btn-success");
//   $(".fave-button").html("Favourited!");
// }

// function promptFavourite() {
//   $(".fave-button").html("Favourite?");
// }

// function isUnfavourited() {
//   $(".fave-button").html("Favourite Map");
// }

// $(".fave-button").click(function () {
//   this.isFavourited();
// });

function clickFavourite() {
  $(".fave-button").toggleClass("unfavourited");
  $(".fave-button").toggleClass("favourited");
  $(".fave-button").toggleClass("btn-outline-danger");
  $(".fave-button").toggleClass("btn-success");
  let textToggle =
    $(".fave-button").text() === "NOT FAVE" ? "Favourited!" : "NOT FAVE";
  $(".fave-button").empty();
  $(".fave-button").text(textToggle);
}

// function clickUnfavourite() {
//   $(".fave-button").toggleClass("favourited");
//   $(".fave-button").toggleClass("unfavourited");
//   $(".fave-button").toggleClass("btn-success");
//   $(".fave-button").toggleClass("btn-outline-danger");
//   $(".fave-button").empty();
//   $(".fave-button").text("NOT FAVE");
// }

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
