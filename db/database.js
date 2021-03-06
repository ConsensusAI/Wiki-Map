const { Pool } = require("pg");

const pool = new Pool({
  user: "henrique",
  password: "123",
  host: "localhost",
  database: "midterm",
});

const getAllMaps = function () {
  let queryString = `SELECT *
  FROM maps
  ORDER BY id;`;

  return pool
    .query(queryString)
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllMaps = getAllMaps;

const getMapInfo = (mapId) => {
  let queryString = `SELECT * FROM maps
  WHERE maps.id = $1`;
  let queryParams = [mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getMapInfo = getMapInfo;

const getAllPointsByUserAndMap = (userId, mapId) => {
  let queryString = `SELECT * FROM points WHERE created_by = $1 AND map_id = $2;`;
  let queryParams = [userId, mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllMapsByUser = function (userId) {
  let queryString = `SELECT * FROM maps WHERE created_by = $1;`;
  let queryParams = [1];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllMapsByUser = getAllMapsByUser;

exports.getAllPointsByUserAndMap = getAllPointsByUserAndMap;

const getAllPointsByMap = (mapId) => {
  let queryString = `SELECT * FROM points WHERE map_id = $1;`;
  let queryParams = [mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      // console.log(res.rows);
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
      // console.log(res.rows);
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
  // console.log("on database.js: ", point);
  let queryString = `INSERT INTO points (id, map_id, title, description, image, lat, lng, created_by)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  let queryParams = [
    point.pId,
    point.mapId,
    point.title,
    point.desc,
    point.image,
    point.lat,
    point.lng,
    point.createdBy,
  ];
  // console.log("queryStr", queryParams);
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

const addNewMapPoint = (point) => {
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

exports.addNewMapPoint = addNewMapPoint;

const addContribution = (contribution) => {
  // TODO: Remove date_contributed so that it automatically inputs Now
  let queryString = `INSERT INTO maps_users (user_id, map_id)
  VALUES ($1, $2);`;
  let queryParams = [contribution.userId, contribution.mapId];

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

const addToFavouritesTableOnContribution = (contribution) => {
  let queryString = `INSERT INTO favourites (user_id, map_id, favourite)
  VALUES ($1, $2, FALSE);`;
  let queryParams = [contribution.userId, contribution.mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.addToFavouritesTableOnContribution = addToFavouritesTableOnContribution;

const getContributions = (userId) => {
  let queryString = `SELECT DISTINCT maps.id, title, lat, lng, created_by, public FROM maps
  JOIN maps_users ON maps.id = map_id
  JOIN users ON users.id = user_id
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

exports.getContributions = getContributions;

const getFavouriteMaps = (userId) => {
  let queryString = `SELECT DISTINCT maps.id, title, lat, lng, created_by, public FROM maps
  JOIN favourites ON maps.id = map_id
  JOIN users ON users.id = user_id
  WHERE user_id = $1
  AND favourite = TRUE;`;
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

exports.getFavouriteMaps = getFavouriteMaps;

const checkIfFavouriteExists = (userId, mapId) => {
  let queryString = `SELECT COUNT(*)
  FROM favourites
  WHERE user_id = $1
  AND map_id = $2`;
  let queryParams = [userId, mapId];
  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.checkIfFavouriteExists = checkIfFavouriteExists;

const favouriteMap = (userId, mapId) => {
  let queryString = `INSERT INTO favourites (user_id, map_id, favourite)
  VALUES ($1, $2, TRUE);`;
  let queryParams = [userId, mapId];

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

const unFavouriteMap = (userId, mapId) => {
  let queryString = `UPDATE favourites
  SET favourite = FALSE
  WHERE user_id = $1
  AND mapId = $2;`;
  let queryParams = [userId, mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.unFavouriteMap = unFavouriteMap;

const toggleFavouriteMap = (userId, mapId) => {
  let queryString = `UPDATE favourites
  SET favourite = NOT favourite
  WHERE user_id = $1
  AND map_id = $2;`;
  let queryParams = [userId, mapId];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      console.log("FAVOURITE TOGGLED");
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.toggleFavouriteMap = toggleFavouriteMap;

const getAllPublicMapsByUser = function (id) {
  return pool
    .query("SELECT * FROM maps WHERE public = TRUE AND created_by = $1, [id]")
    .then((result) => {
      // console.log("maps: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getAllPublicMapsByUser = getAllPublicMapsByUser;

const getLastPointId = function () {
  return pool
    .query("SELECT id FROM points ORDER BY id DESC")
    .then((result) => {
      // console.log("last id: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getLastPointId = getLastPointId;

const removePoint = function (pointId) {
  console.log("database.js removePoint: ", pointId);
  return pool
    .query("DELETE FROM points WHERE id = $1;", [pointId])
    .then((result) => {
      console.log("Deleted point id: ", pointId);
      return result;
    })
    .catch((err) => console.log(err));
};
exports.removePoint = removePoint;

const getUserName = function (userId) {
  return pool
    .query("SELECT name FROM users WHERE id = $1, [userId]")
    .then((result) => {
      // console.log("names: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getUserName = getUserName;

const getUserEmail = function (userId) {
  return pool
    .query("SELECT email FROM users WHERE id = $1, [userId]")
    .then((result) => {
      // console.log("emails: ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

exports.getUserEmail = getUserEmail;

const getUserInfo = (userId) => {
  let queryString = `SELECT * FROM users
  WHERE users.id = $1;`;
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

exports.getUserInfo = getUserInfo;

const renameMap = (mapId, renamedName) => {
  let queryString = `UPDATE maps
  SET title = $2
  WHERE maps.id = $1`;
  let queryParams = [mapId, renamedName];

  return pool
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.renameMap = renameMap;

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
