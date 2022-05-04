const express = require("express");
const router = express.Router();

const testDb = {};

// Create New Map Forms
router.post("/", function (req, res) {
  testDb["0001"] = {
    name: req.body["newMapName"],
    latitude: req.body["latitude"],
    longitude: req.body["longitude"],
  };

  let name = testDb["0001"].name;
  let lat = testDb["0001"].latitude;
  let lng = testDb["0001"].longitude;

  // Query to send new map data to database
  // pool
  //   .query(
  //     "INSERT INTO maps (title, lat, lng, created_by, public) VALUES ($1, $2, $3, $4, $5)",
  //     [name, lat, lng]
  //   )
  //   .then((result) => {});

  res.send("Name: " + name + "\nLatitude: " + lat + "\nLongitude: " + lng);
});

const getMapsByUser = function (email) {
  return pool
    .query("SELECT * FROM maps WHERE email = $1", [email])
    .then((result) => {
      console.log("maps: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

(module.exports = router), getMapsByUser;
