const express = require("express");
const router = express.Router();

// Edit/Contribute page
router.get("/edit", function (req, res) {
  res.render("edit");
});

module.exports = router;
