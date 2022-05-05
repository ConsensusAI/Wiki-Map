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
    let userId = req.cookies["userId"];
    let mapId = req.cookies["mapId"];
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

  // Create new map
  router.post("/new", (req, res) => {
    let userId = req.cookies["userId"];

    let details = req.body;
    let private = false;
    if (details.privateMap) {
      private = true;
    }

    let newMap = {
      name: details.newMapName,
      userId: userId,
      latitude: details.hiddenlat,
      longitude: details.hiddenlng,
      privacy: private,
    };

    // let mapId = database.addMap(newMap);
    let mapId = req.cookies["mapId"];

    let newPoint = {
      mapId: mapId,
      title: details.pointTitle,
      desc: details.pointDesc,
      image: details.pointURL,
      lat: details.hiddenlat,
      lng: details.hiddenlng,
      createdBy: userId,
    };

    console.log(newMap);
    console.log(newPoint);

    // database.addPoint(newPoint);
  });

  return router;
};
