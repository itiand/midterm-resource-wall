const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  db.query(`SELECT resources.*, users.username, categories.name AS category_name, ROUND(AVG(number_rating), 1) as rating
  FROM resources
  JOIN users ON users.id = resources.user_id
  JOIN categories ON categories.id = resources.category_id
  JOIN ratings ON resources.id = ratings.resource_id
  GROUP BY resources.id, resources.*, users.username, categories.name;
  `)
  .then(data => {
    const templateVars = { resources: data.rows };
    console.log('WALDO', templateVars);

    return res.render('home', templateVars);
  })
    .catch(err => console.log("dbQueryErr", err));

});

module.exports = router;

