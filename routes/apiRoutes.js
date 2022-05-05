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
    database
      .getAllPointsByUser(1, 1)
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
