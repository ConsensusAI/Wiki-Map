const express = require("express");
const router = express.Router();

const testDb = {};

// Create New Map Forms
router.post("/", function (req, res) {
  testDb["0001"] = {
    name: req.body["newMapName"],
    latitude: req.body["locationAddress"],
    longitude: req.body["country"],
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

module.exports = router;
