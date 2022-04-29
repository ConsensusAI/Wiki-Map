const express = require("express");
const app = express();

const newRoute = () => {
  app.get("/new", (req, res) => {
    res.render("create");
  });
};

module.exports = { newRoute };
