const express = require("express");
const router = express.Router();

// Profile page of the user
router.get("/", function (req, res) {
  res.render("profile");
});

module.exports = router;
