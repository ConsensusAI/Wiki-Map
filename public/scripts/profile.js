const addFavouriteMapsList = (mapsJson) => {
  let maps = mapsJson["favouriteMaps"];
  for (let favouriteMap in maps) {
    console.log(maps[favouriteMap]);
    $("#favourited-maps")
      .append(
        `<li>
      <button type="submit" name="selectedMapId" value="${maps[favouriteMap]["id"]}" class="link-button">
      ${maps[favouriteMap]["title"]}
      </button>
      </li>`
      )
      .click(function () {
        alert("Handler for .click() called.");
      });
  }
};

function loadFavouriteMaps() {
  $("#favourited-maps").html("");
  $.ajax({
    url: "/maps/favourites",
    success: function (json) {
      addFavouriteMapsList(json);
    },
  });
}

const addContributionsList = (mapsJson) => {
  let maps = mapsJson["contributedMaps"];
  for (let contributedMap in maps) {
    console.log(maps[contributedMap]);
    $("#contributed-maps").append(
      `<li>
      <button type="submit" name="selectedMapId" value="${maps[contributedMap]["id"]}" class="link-button">
      ${maps[contributedMap]["title"]}
      </button>
      </li>`
    );
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

$.ajax("/users").then((res) => {
  let username = res["user"][0]["name"];
  $("#person-name").html(username);
});

$.ajax("/users").then((res) => {
  let email = res["user"][0]["email"];
  $("#email").html("Email: " + email);
});

$.ajax("/users").then((res) => {
  let displayPic = res["user"][0]["profile_pic"];
  $("#display-pic").attr("src", displayPic);
});
