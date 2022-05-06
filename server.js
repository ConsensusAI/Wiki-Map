// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// Cookie setup
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Parse Information Sent in Body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const createMap = require("./routes/createMap");
const apiRoutes = require("./routes/apiRoutes");
const profile = require("./routes/profile");
const edit = require("./routes/edit");
const test = require("./routes/testDisplayRoute");
const cookiesRoute = require("./routes/cookies");

// Set up interaction with the database
const database = require("./db/database");
const res = require("express/lib/response");
const expressRouter = express.Router();
apiRoutes(expressRouter, database);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes());
app.use("/api/widgets", widgetsRoutes());
app.use("/maps/new", createMap);
app.use("/maps", expressRouter);
app.use("/profile", profile);
app.use("/edit", edit);
app.use("/test", test);
app.use("/cookies", cookiesRoute);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.cookie("userId", 1);
  res.cookie("mapId", 1);
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
