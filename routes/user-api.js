const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/:id/my-resources', (req, res) => {
  const id = Number(req.params.id);

  console.log('BRIGHT', id);

  const filteredQuery = `SELECT resources.*, users.username, categories.name AS category_name,
  (SELECT ROUND(AVG(number_rating), 1)
  FROM ratings
  WHERE resources.id = ratings.resource_id) AS rating
  FROM resources
  JOIN users ON users.id = resources.user_id
  JOIN categories ON categories.id = resources.category_id
  WHERE resources.user_id = $1;`;

db.query(filteredQuery, [id])
  .then(data => {
    const idResources = data.rows;
    res.json({ resources: idResources });
  })
  .catch(err => {
    console.log("dbQueryErr", err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

module.exports = router;
