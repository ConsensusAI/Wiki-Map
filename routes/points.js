const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/user/:userId", (req, res) => {
    db.query(`SELECT * FROM points WHERE user_id = $1;`, [req.params.userId])
      .then(data => {
        const points = data.rows;
        res.json({ points });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
