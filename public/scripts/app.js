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
    let map_id = Number(getCookie("mapId")) - 1;
    let m = maps.maps[map_id];
    console.log("debugging", maps.maps[map_id]);
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
  function onMapClick(e) {
    latlng = e.latlng;

    let popContent = document.createElement("div");
    let pTag = document.createElement("p");
    pTag.textContent = `Clicked on: ${e.latlng}`;
    popContent.appendChild(pTag);
    let button = document.createElement("button");
    button.textContent = "Save";
    button.addEventListener("click", () => {
      // console.log('button clicked')
      saveMarker(latlng);
      // savePointToTable(latlng);
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

    // let json = JSON.stringify(user_id);
    // console.log("json", json);
    // $.ajax({
    //   type: "GET",
    //   url: "/maps/user",
    //   data: json,
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   success: function(data) {
    //     addMapsList(data);
    //   }
    // });

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
            // console.log('button clicked')
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
    let title = prompt("Please enter the title", "Write...");
    let desc = prompt("Brief description", "Write...");

    $.ajax({
      url: "/maps/points/last",
      success: function (json) {
        let newIdPoint = json.points.id + 1;

        // let popContent = document.createElement("div");
        // let newForm = document.createElement("form");
        // newForm.action = "/maps/points/remove";
        // newForm.method = "post";
        // let hiddenIdTag = document.createElement("input");
        // hiddenIdTag.classList.add("d-none");
        // hiddenIdTag.name = "hiddenID";
        // hiddenIdTag.value = newIdPoint;
        // let btnTag = document.createElement("button");
        // btnTag.type = "submit";
        // btnTag.textContent = "Remove";
        // btnTag.addEventListener("click", () => {
        //   clearMarker(newIdPoint);
        // });
        // newForm.appendChild(btnTag);
        // newForm.appendChild(hiddenIdTag);
        // popContent.appendChild(newForm);
        // console.log(newForm);

        let popContent = document.createElement("div");
        let btnTag = document.createElement("button");
        btnTag.textContent = "Remove";
        btnTag.addEventListener("click", () => {
          clearMarker(newIdPoint);
        });
        popContent.appendChild(btnTag);

        let pTag = document.createElement("p");
        pTag.textContent = title;
        popContent.appendChild(pTag);
        let descTag = document.createElement("p");
        descTag.textContent = desc;
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

        let map_id = Number(getCookie("mapId")) - 1;
        let newPoint = {
          mapId: map_id,
          title: title,
          desc: desc,
          image: "",
          lat: latlng.lat,
          lng: latlng.lng,
          createdBy: user_id,
        };

        // Save new point on DB
        var json = JSON.stringify(newPoint);
        // console.log("jsonstringfy: ", json);
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
      success: function(msg) {
        console.log("Success: point added");
      }
    });
    loadPoints();
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

// OLD CODE -------------------------------------------------------------------------------------------

// // Map - initialize on "map"
// let userMaps = [];
// maps.forEach((m, index) => {
//   if (m.created_by === user_id) {
//     userMaps.push([m.id, index]);
//   }
// });

// // By default we are displaying the first map found for each user
// map_id = userMaps[0][0];
// document.getElementById("map-title").innerHTML = maps[userMaps[0][1]].title;
// let map = L.map("map").setView(
//   [maps[userMaps[0][1]].lat, maps[userMaps[0][1]].lng],
//   13
// );
// let markers = [];

// // Tile Layer
// L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken:
//       "pk.eyJ1IjoiaGVucmlxdWV0YWthIiwiYSI6ImNsMmlkZnVhMDAxcW0zZG50OHZkMmw2bjcifQ.sjkW4ZrEFg8NOCIKEQki1g",
//   }
// ).addTo(map);

// loadMaps(); // List of maps for the user e.g. Best Places in Ottawa/Montreal
// loadMarkers(); // Place the markers in the map from points table
// loadPoints(); // List of points(places) saved on the map e.g. Point1, Point2, etc

// console.log("markers: ", markers, " --- points: ", points);

// // Click Event
// let clickedMapPopup = L.popup();

// let latlng;
// function onMapClick(e) {
//   latlng = e.latlng;
//   let popContent = `<p>Clicked on: ${e.latlng}</p></br><button onclick=saveMarker(latlng)>Save</button>`;

//   clickedMapPopup.setLatLng(e.latlng).setContent(popContent).openOn(map);
// }

// Functions here -------------------------------------------------------------------------------------------

// // List of Maps (Ottawa, Montreal, etc)
// function loadMaps() {
//   document.getElementById("maps-list").innerHTML = "";
//   maps.map((m, index) => {
//     if (m.created_by === user_id) {
//       let node = document.createElement("li");
//       let nodeText = document.createTextNode(m.title);
//       node.setAttribute("onclick", `loadMapId(${m.id}, ${index})`);
//       node.appendChild(nodeText);
//       document.getElementById("maps-list").appendChild(node);
//     }
//   });
// }

// // List of points saved on the map (Point1, Point2, etc)
// function loadPoints() {
//   document.getElementById("map-points").innerHTML = "";
//   /*$.ajax(url)
//   .then(res => {
//     res.points.map(p => {
//       if (p.map_id === map_id) {
//         let node = document.createElement("li");
//         let nodeText = document.createTextNode(p.title);
//         node.setAttribute("onclick", `showPopup(${p.id})`);
//         node.appendChild(nodeText);
//         document.getElementById("map-points").appendChild(node)
//       }
//     });
//   })*/
//   points.map((p) => {
//     if (p.map_id === map_id) {
//       let node = document.createElement("li");
//       let nodeText = document.createTextNode(p.title);
//       node.setAttribute("onclick", `showPopup(${p.id})`);
//       node.appendChild(nodeText);
//       document.getElementById("map-points").appendChild(node);
//     }
//   });
// }

// // Markers on the map from points table
// function loadMarkers() {
//   points.map((p) => {
//     if (p.map_id === map_id) {
//       console.log(p);
//       let tempMarker = L.marker([p.lat, p.lng]).addTo(map);
//       let content = `<p>${p.title}</p>
//         </br>
//         <p>${p.description}</p>
//         </br>
//         <img src="${p.image}" style="width:150px;height:150px;">
//         <button onclick="clearMarker(${p.id})">Remove</button>`;
//       tempMarker._id = p.id;
//       markers.push(tempMarker);
//       tempMarker.bindPopup(content);
//     }
//   });
// }

// // Load a new selected Map by ID - it loads again the markers and points
// function loadMapId(id, index) {
//   map_id = id;
//   document.getElementById("map-title").innerHTML = maps[index].title;
//   map.setView([maps[index].lat, maps[index].lng], 13);
//   markers = []; // reset markers array
//   loadMarkers();
//   // loadPoints();
// }

// // Save point on map (creates a new marker and add to points table)
// function saveMarker(latlng) {
//   let tempMarker = L.marker([latlng.lat, latlng.lng]).addTo(map);
//   let title = prompt("Please enter the title", "Write...");
//   let desc = prompt("Brief description", "Write...");
//   let newIdPoint = points[Object.keys(points).length - 1].id + 1;
//   let content = `<p>${title}</p></br><p>${desc}</p></br><button onclick="clearMarker(${newIdPoint})">Remove</button>`;
//   tempMarker._id = newIdPoint;
//   markers.push(tempMarker);
//   tempMarker.bindPopup(content).openPopup();

//   // Implement on Database - points table
//   points.push({
//     id: newIdPoint,
//     title: title,
//     description: desc,
//     lat: latlng.lat,
//     lng: latlng.lng,
//     map_id: map_id,
//   });

//   // loadPoints();
//   console.log("<<saveMarkers>> markers: ", markers, " --- points: ", points);
// }

// // Clear marker
// function clearMarker(idMarker) {
//   // let newMarkers = [];

//   markers.forEach((m, index) => {
//     if (m._id === idMarker) {
//       m.remove();
//       markers.splice(index, 1);
//     }
//   });
//   // markers = newMarkers;
//   console.log("markers: ", markers);

//   points.forEach((p, index) => {
//     if (p.id === idMarker) {
//       points.splice(index, 1);
//     }
//   });

// loadPoints();
// console.log("<<clearMarkers>> markers: ", markers, " --- points: ", points);
// }

// function showPopup(id) {
//   markers.forEach((m) => {
//     if (m._id === id) {
//       m.openPopup();
//     }
//   });
// }

// map.on("click", onMapClick);
