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
  res.send(
    "Name: " +
      testDb["0001"].name +
      "\nLatitude: " +
      testDb["0001"].latitude +
      "\nLongitude: " +
      testDb["0001"].longitude
  );
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
