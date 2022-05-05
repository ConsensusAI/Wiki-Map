const express = require("express");
const router = express.Router();

// Create New Map Forms
router.get("/", function (req, res) {
  res.render("create");
});

router.get("/WIP", (req, res) => {
  res.render("newMap");
});

module.exports = router;
