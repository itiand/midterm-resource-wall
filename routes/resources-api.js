const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');
const db = require('../db/connection');


router.get('/', (req, res) => {
  resourceQueries.searchResources(req.query.text)
    .then(resources => {
      res.json({ resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/all', (req, res) => {
  db.query(`SELECT resources.*, users.username, categories.name AS category_name,
  (SELECT ROUND(AVG(number_rating), 1)
  FROM ratings
  WHERE resources.id = ratings.resource_id) AS rating
  FROM resources
  JOIN users ON users.id = resources.user_id
  JOIN categories ON categories.id = resources.category_id;
  `, [])
    .then(data => {
      res.json({ resources: data.rows });
    })
    .catch(err => console.log("dbQueryErr", err));
});

module.exports = router;
