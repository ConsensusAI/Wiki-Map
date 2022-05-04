const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "template1",
});

const getAllMaps = function () {
  let queryString = `SELECT * FROM maps;`;

  return pool
    .query(queryString)
    .then((res) => {
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
