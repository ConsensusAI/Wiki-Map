$(() => {
  let map;
  function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  let user_id = 1;
  let markers = [];
  let userMaps = [];

  $.ajax("/maps").then((maps) => {
    let map_id = Number(getCookie("mapId"));
    console.log(map_id);
    let m = maps.maps[map_id - 1];
    console.log("debugging", m);
    console.log(m.lat);
    map = L.map("map").setView([Number(m.lat), Number(m.lng)], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g",
      }
    ).addTo(map);

    map.on("click", onMapClick);
  });

  loadMaps(user_id);
  loadPoints();
  loadMarkers();

  // Click Event
  let clickedMapPopup = L.popup();
  let latlng;
  let inputTitle;
  let inputDesc;
  function onMapClick(e) {
    latlng = e.latlng;
    inputTitle = "";
    inputDesc = "";

    let popContent = document.createElement("div");
    let pTag = document.createElement("p");
    pTag.textContent = "New Point";
    popContent.appendChild(pTag);

    let inputTag = document.createElement("input");
    inputTag.placeholder = "title...";
    inputTag.name = "inputTitle";
    let labelTitle = document.createElement("label");
    labelTitle.htmlFor = "inputTitle";
    labelTitle.textContent = "Title and Description";
    popContent.appendChild(labelTitle);
    let space = document.createElement("br");
    popContent.appendChild(space);
    popContent.appendChild(inputTag);

    let descTag = document.createElement("textarea");
    descTag.name = "inputDesc";
    let labelDesc = document.createElement("label");
    labelDesc.htmlFor = "inputDesc";
    popContent.appendChild(labelDesc);
    descTag.placeholder = "write...";
    popContent.appendChild(descTag);

    let button = document.createElement("button");
    button.textContent = "Save";
    button.addEventListener("click", () => {
      saveMarker(latlng);
      inputTitle = inputTag.value;
      inputDesc = descTag.value;
      console.log(inputTitle, inputDesc);
    });
    popContent.appendChild(button);

    clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(map);
  }

  // List of Maps (Ottawa, Montreal, etc)
  function loadMaps(user_id) {
    $("#maps-list").html("");
    $.ajax({
      url: "/maps/user",
      success: function (json) {
        addMapsList(json);
      },
    });
  }

  // List of Points
  function loadPoints() {
    $.ajax({
      url: "/maps/points",
      success: function (json) {
        addPointsList(json);
      },
    });
  }

  // Load Markers to the map from points table
  function loadMarkers() {
    $.ajax("/maps/points").then((res) => {
      let map_id = getCookie("mapId");
      res.points.map((p, index) => {
        console.log("point: ", p, "p.map_id: ", p.map_id, "map_id: ", map_id);
        if (p.map_id == map_id) {
          let tempMarker = L.marker([p.lat, p.lng]).addTo(map);

          let popContent = document.createElement("div");

          let pTagTitle = document.createElement("p");
          pTagTitle.textContent = p.title;
          popContent.appendChild(pTagTitle);

          let pTagDesc = document.createElement("p");
          pTagDesc.textContent = p.description;
          popContent.appendChild(pTagDesc);

          let imgTag = document.createElement("img");
          imgTag.src = p.image;
          imgTag.style.width = "150px";
          imgTag.style.height = "150px";
          popContent.appendChild(imgTag);
          let button = document.createElement("button");
          button.textContent = "Remove";
          button.addEventListener("click", () => {
            clearMarker(p.id);
          });
          popContent.appendChild(button);
          tempMarker._id = p.id;
          markers.push(tempMarker);
          tempMarker.bindPopup(popContent);
        }
      });
    });
  }

  // Save point on map (creates a new marker and add to points table)
  function saveMarker(latlng) {
    let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);

    $.ajax({
      url: "/maps/points/last",
      success: function (json) {
        let newIdPoint = json.points.id + 1;

        let popContent = document.createElement("div");
        let btnTag = document.createElement("button");
        btnTag.textContent = "Remove";
        btnTag.addEventListener("click", () => {
          clearMarker(newIdPoint);
        });
        popContent.appendChild(btnTag);

        let pTag = document.createElement("p");
        pTag.textContent = inputTitle;
        popContent.appendChild(pTag);
        let descTag = document.createElement("p");
        descTag.textContent = inputDesc;
        popContent.appendChild(descTag);
        let imgTag = document.createElement("img");
        imgTag.src =
          "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
        imgTag.style.width = "150px";
        imgTag.style.height = "150px";
        popContent.appendChild(imgTag);
        tempMarker._id = newIdPoint;
        markers.push(tempMarker);
        tempMarker.bindPopup(popContent).openPopup();

        let map_id = Number(getCookie("mapId"));
        let newPoint = {
          pId: newIdPoint,
          mapId: map_id,
          title: inputTitle,
          desc: inputDesc,
          image: "",
          lat: latlng.lat,
          lng: latlng.lng,
          createdBy: user_id,
        };

        // Save new point on DB
        var json = JSON.stringify(newPoint);
        $.ajax({
          type: "POST",
          url: "maps/points/add",
          data: json,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (msg) {
            loadPoints();
          },
        });
      },
    });
  }

  // Clear marker
  function clearMarker(idMarker) {
    let json = JSON.stringify({ id: idMarker });
    markers.forEach((m, index) => {
      if (m._id === idMarker) {
        m.remove();
        markers.splice(index, 1);
      }
    });
    $.ajax({
      type: "POST",
      url: "/maps/points/remove",
      data: json,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (msg) {
        console.log("Success: point added");
      },
    }).then(() => {
      loadPoints();
    });
  }

  // add points
  const addPointsList = (pointsJson) => {
    let points = pointsJson["points"];
    $("#map-points").html("");
    for (let point in points) {
      let linkTag = document.createElement("li");
      linkTag.textContent = points[point]["title"];
      linkTag.addEventListener("click", () => {
        showPopup(points[point]["id"]);
      });
      $("#map-points").append(linkTag);
    }
  };

  // Try new add maps list
  const addMapsList = (mapsJson) => {
    let maps = mapsJson["maps"];
    for (let map in maps) {
      $("#maps-list")
        .append(
          `<li>
        <button type="submit" name="selectedMapId" value="${maps[map]["id"]}" class="link-button">
        ${maps[map]["title"]}
        </button>
        </li>`
        )
        .click(function () {
          console.log("changed map");
          map.setView([maps[map].lat, maps[map].lng], 13);
        });
    }
  };

  // Open Popup
  function showPopup(id) {
    markers.forEach((m) => {
      if (m._id === id) {
        m.openPopup();
      }
    });
  }
});
