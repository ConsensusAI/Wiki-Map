const { Pool } = require("pg");
const dbParams = require("../lib/db");

const pool = new Pool({ dbParams });

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
