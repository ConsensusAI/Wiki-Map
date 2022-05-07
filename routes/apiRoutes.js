module.exports = function (router, database) {
  // Get all the maps
  router.get("/maps", function (req, res) {
    database
      .getAllMaps()
      .then((maps) => res.send({ maps }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Get all points from specific map
  router.get("/maps/points", (req, res) => {
    let mapId = Number(req.cookies["mapId"]);
    database
      .getAllPointsByMap(mapId)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Get Favourite Maps
  router.get("/maps/favourites", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    database
      .getFavouriteMaps(userId)
      .then((favouriteMaps) => res.send({ favouriteMaps }));
  });

  router.post("/maps/favourites", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    let mapId = Number(req.cookies["mapId"]);
    database.checkIfFavouriteExists(userId, mapId).then((counts) => {
      let count = Number(counts[0]["count"]);
      console.log("COUNT:-----------------", count);
      if (count > 0) {
        database.toggleFavouriteMap(userId, mapId).then((rows) => {
          setTimeout(function () {
            res.redirect("/");
          }, 20);
        });
      } else {
        database.favouriteMap(userId, mapId).then(() => {
          res.redirect("/");
        });
      }
    });

    console.log("====Favourited!=====");

    // req.mapId = 2;
    // res.send("Favourited map!");
  });

  // Get Contributed Maps
  router.get("/maps/contributions", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    database
      .getContributions(userId)
      .then((contributedMaps) => res.send({ contributedMaps }));
  });

  // Points for specific map
  router.get("/maps/user", function (req, res) {
    console.log("apiRoutes.js /maps/user req.body", req.body);
    database
      .getAllMapsByUser(req.body.userId)
      .then((maps) => res.send({ maps }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Add point to points table
  router.post("/maps/points/add", function (req, res) {
    console.log("apiRoutes: ", req.body);
    database
      .addPoint(req.body)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Last point ID
  router.get("/maps/points/last", function (req, res) {
    database
      .getLastPointId()
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Remove Point
  router.post("/maps/points/remove", function (req, res) {
    console.log("removepoint req.body", req.body);
    pointId = req.body.id;
    database
      .removePoint(Number(pointId))
      .then((points) => {
        // res.send({points});
        document.location.reload();
        // res.redirect("/");
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // router.get("/maps/points/remove/:id", function (req, res) {
  //   console.log("id is: " + req.params["id"]);
  //   // database
  //   //   .removePoint(Number(req.params["id"][0]["id"]))
  //   //   .then((points) => res.send({ points }))
  //   //   .catch((e) => {
  //   //     console.error(e);
  //   //     res.send(e);
  //   //   });
  // });

  // Create new map
  router.post("/maps/new", (req, res) => {
    let userId = Number(req.cookies["userId"]);

    let details = req.body;
    let private = false;
    if (details.privateMap) {
      private = true;
    }

    let newMap = {
      name: details.newMapName,
      userId: Number(userId),
      latitude: Number(details.hiddenlat),
      longitude: Number(details.hiddenlng),
      privacy: private,
    };

    database.addMap(newMap);

    database.getMaxId().then((id) => {
      console.log(id);
      let mapId = id[0]["max"];
      let newPoint = {
        mapId: Number(mapId),
        title: details.pointTitle,
        desc: details.pointDesc,
        image: details.pointURL,
        lat: Number(details.hiddenlat),
        lng: Number(details.hiddenlng),
        createdBy: Number(userId),
      };

      database.addPoint(newPoint).then(() => {
        let contribution = { userId: Number(userId), mapId: Number(mapId) };
        database.addContribution(contribution);
        database.addToFavouritesTableOnContribution(contribution);
        res.redirect("/");
      });
    });
  });

  // Select Current Map
  router.post("/selectedMap", (req, res) => {
    res.cookie("mapId", req.body.selectedMapId);

    setTimeout(function () {
      res.redirect("/");
    }, 50);
    // res.redirect("/");
  });

  router.get("/selectedMap", (req, res) => {
    let mapId = req.cookies["mapId"];
    database.getMapInfo(mapId).then((mapInfo) => res.send({ mapInfo }));
  });

  // Get User Info
  router.get("/users", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    console.log(userId);
    database
      .getUserInfo(userId)
      .then((user) => res.send({ user }))
      .catch((e) => {
        res.send(e);
      });
  });

  return router;
};
