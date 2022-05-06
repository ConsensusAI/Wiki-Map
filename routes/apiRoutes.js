module.exports = function (router, database) {
  // Get all the maps
  router.get("/", function (req, res) {
    database
      .getAllMaps()
      .then((maps) => res.send({ maps }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/points", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    let mapId = Number(req.cookies["mapId"]);
    database
      .getAllPointsByUserAndMap(userId, mapId)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/pointsByMap", (req, res) => {
    let mapId = req.cookies["mapId"];
    database
      .getAllPointsByMap(mapId)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Get Favourite Maps
  router.get("/favourites", (req, res) => {
    let userId = Number(req.cookies["userId"]);
    database
      .getFavouriteMaps(userId)
      .then((favouriteMaps) => res.send({ favouriteMaps }));
  });

  router.post("/favourites", (req, res) => {
    console.log("====Favourited!=====");
    // res.send("Favourited map!");
  });

  // Points for specific map
  router.get("/user", function (req, res) {
    database
      .getAllMapsByUser(1)
      .then((maps) => res.send({ maps }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Add point to points table
  router.post("/points/add/:point", function (req, res) {
    database
      .addPoint(req.params["point"])
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Last point ID
  router.get("/points/last", function (req, res) {
    database
      .getLastPointId(1)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Remove Point
  router.post("/points/remove", function (req, res) {
    pointId = req.body.hiddenID;
    console.log("WORKS");
    console.log("hidden ID: ", req.body.hiddenID);
    database
      .removePoint(Number(pointId))
      .then((points) => {
        console.log("Removed");
        // res.send("OK");
        res.redirect("/");
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/points/remove/:id", function (req, res) {
    console.log("id is: " + req.params["id"]);
    // database
    //   .removePoint(Number(req.params["id"][0]["id"]))
    //   .then((points) => res.send({ points }))
    //   .catch((e) => {
    //     console.error(e);
    //     res.send(e);
    //   });
  });

  // Create new map
  router.post("/new", (req, res) => {
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

      // console.log(newMap);
      // console.log(newPoint);
      // console.log(mapId);

      database.addPoint(newPoint).then(() => {
        let contribution = { userId: Number(userId), mapId: Number(mapId) };
        database.addContribution(contribution);
        res.redirect("/");
      });
    });
  });

  router.get("/favourites", (req, res) => {});

  router.post("/favourites", (req, res) => {
    let userId = req.cookies["userId"];
    let mapId = req.cookies["mapId"];

    database.favouriteMap(mapId, userId);
  });

  return router;
};
