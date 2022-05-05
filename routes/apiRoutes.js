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
    let userId = 1;
    let mapId = 1;
    database
      .getAllPointsByUserAndMap(userId, mapId)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.get("/pointsByMap", (req, res) => {
    let mapId = 1;
    database
      .getAllPointsByMap(mapId)
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Create new map
  router.post("/", (req, res) => {
    let private = false;
    if (req.body["privateMap"]) {
      private = true;
    }

    let newMap = {
      name: req.body["newMapName"],
      latitude: req.body["latitude"],
      longitude: req.body["longitude"],
      private: private,
    };

    database
      .addMap(newMap)
      .then((map) => {
        // res.render("index");
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
