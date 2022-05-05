const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm",
});

const getAllMaps = function () {
  let queryString = `SELECT *
  FROM maps;`;

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

const getAllPointsByUserAndMap = (userId, mapId) => {
  let queryString = `SELECT * FROM points WHERE created_by = $1 AND map_id = $2;`;
  let queryParams = [userId, mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllPointsByUserAndMap = getAllPointsByUserAndMap;

const getAllPointsByMap = (mapId) => {
  let queryString = `SELECT * FROM points WHERE map_id = $1;`;
  let queryParams = [mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllPointsByMap = getAllPointsByMap;

const addMap = (map) => {
  let queryString = `INSERT INTO maps (title, lat, lng, created_by, public)
  VALUES ($1, $2, $3, $4, $5);`;
  let queryParams = [
    map.name,
    map.latitude,
    map.longitude,
    map.userId,
    map.privacy,
  ];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addMap = addMap;

const getMaxId = () => {
  let queryString = `SELECT MAX(id) FROM maps;`;

  return pool
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getMaxId = getMaxId;

const addPoint = (point) => {
  let queryString = `INSERT INTO points (map_id, title, description, image, lat, lng, created_by)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  let queryParams = [
    point.mapId,
    point.title,
    point.desc,
    point.image,
    point.lat,
    point.lng,
    point.createdBy,
  ];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addPoint = addPoint;

const addContribution = (contribution) => {
  // TODO: Remove date_contributed so that it automatically inputs Now
  let queryString = `INSERT INTO maps_users (user_id, map_id, date_contributed, favourite)
  VALUES ($1, $2, $3, $4);`;
  let queryParams = [
    contribution.userId,
    contribution.mapId,
    "04/28/2022",
    false,
  ];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addContribution = addContribution;

const favouriteMap = (userId) => {
  let queryString = `UPDATE maps_users
  SET favourite = TRUE
  WHERE user_id = $1;`;
  let queryParams = [userId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.favouriteMap = favouriteMap;

const getAllPublicMapsByUser = function (id) {
  return pool
    .query("SELECT * FROM maps WHERE public = TRUE AND created_by = $1, [id]")
    .then((result) => {
      console.log("maps: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getAllPublicMapsByUser = getAllPublicMapsByUser;

// const getMapsByUser = function (email) {
//   return pool
//     .query("SELECT * FROM maps WHERE email = $1", [email])
//     .then((result) => {
//       console.log("maps: ", result.rows[0]);
//       return result.rows[0];
//     })
//     .catch((err) => console.log(err));
// };

// (module.exports = router), getMapsByUser;

/*
Queries for making new map, new point, new contribution
New map:
INSERT INTO maps (title, lat, lng, created_by, public) VALUES ($1, $2, $3, $4, $5);
New point:
INSERT INTO points (map_id, title, description, image, lat, lng, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7)
New contribution:                                        false by default
INSERT INTO maps_users (user_id, map_id, date_contributed, favourite) VALUES ($1, $2, $3, $4);
Favourited:
UPDATE maps_users
SET favourite = TRUE
WHERE user_id = $1;
*/
