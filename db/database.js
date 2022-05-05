const { Pool } = require("pg");
const dbParams = require("../lib/db");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm",
});

const getAllMaps = function () {
  let queryString = `SELECT * FROM maps;`;

  return pool
    .query(queryString)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllMaps = getAllMaps;

const addMap = (map) => {
  let queryString = `INSERT INTO maps (title, lat, lng, created_by, public) VALUES ($1, $2, $3, $4, $5)`;
  let queryParams = [map.name, map.latitude, map.longitude, 666, map.privacy];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addMap = addMap;

const getAllPublicMapsByUser = function (id) {
  return pool
    .query("SELECT * FROM maps WHERE public = 1 AND created_by = $1, [id]")
    .then((result) => {
      console.log("maps: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getAllPublicMapsByUser = getAllPublicMapsByUser;
