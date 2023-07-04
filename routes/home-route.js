const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  db.query(`SELECT resources.*, users.username, categories.name AS category_name,
  (SELECT ROUND(AVG(number_rating), 1)
  FROM ratings
  WHERE resources.id = ratings.resource_id) AS rating
  FROM resources
  JOIN users ON users.id = resources.user_id
  JOIN categories ON categories.id = resources.category_id;

  `)
    .then(data => {
      const templateVars = { resources: data.rows };
      console.log('WALDO', templateVars);

      return res.render('home', templateVars);
    })
    .catch(err => console.log("dbQueryErr", err));

});


// Server route to handle the filtering
router.get('/HTML', (req, res) => {
  const filteredQuery = `SELECT resources.*, users.username, categories.name AS category_name,
    (SELECT ROUND(AVG(number_rating), 1)
    FROM ratings
    WHERE resources.id = ratings.resource_id) AS rating
    FROM resources
    JOIN users ON users.id = resources.user_id
    JOIN categories ON categories.id = resources.category_id
    WHERE categories.name = 'HTML';`; // Replace 'html' with the selected category

  db.query(filteredQuery)
    .then(data => {
      console.log('WE HERE', data.rows);

      const filteredResources = data.rows;

      return res.json({ resources: filteredResources });

    })
    .catch(err => {
      console.log("dbQueryErr", err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;

