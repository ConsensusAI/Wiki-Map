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
  router.post("/points/remove/:id", function (req, res) {
    database
      .removePoint(req.params['id'])
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
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

      console.log(newMap);
      console.log(newPoint);
      console.log(mapId);

      database.addPoint(newPoint).then(() => {
        let contribution = { userId: Number(userId), mapId: Number(mapId) };
        database.addContribution(contribution);
        res.redirect("/");
      });
    });
  });

  return router;
};
