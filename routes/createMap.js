const express = require("express");
const router = express.Router();

// Create New Map Forms
router.get("/", (req, res) => {
  res.render("newMap");
});

module.exports = router;
