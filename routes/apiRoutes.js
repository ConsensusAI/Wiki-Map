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
        res.send(map);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // Points for specific map
  router.get("/points", function (req, res) {
    database
      .getAllPoints()
      .then((points) => res.send({ points }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

// Query to send new map data to database
// pool
//   .query(
//     "INSERT INTO maps (title, lat, lng, created_by, public) VALUES ($1, $2, $3, $4, $5)",
//     [name, lat, lng, private]
//   )
//   .then((result) => {});

// const getAllPublicMaps = function () {
//   return pool
//     .query("SELECT * FROM maps WHERE public = 1")
//     .then((result) => {
//       console.log("maps: ", result.rows);
//       return result.rows;
//     })
//     .catch((err) => console.log(err));
// };

// (module.exports = router), getAllPublicMaps;

// res.send("Name: " + name + "\nLatitude: " + lat + "\nLongitude: " + lng);

// const getMapsByUser = function (email) {
//   return pool
//     .query("SELECT * FROM maps WHERE email = $1", [email])
//     .then((result) => {
//       console.log("maps: ", result.rows[0]);
//       return result.rows[0];
//     })
//     .catch((err) => console.log(err));
// };

// (module.exports = router), getMapsByUser;
