const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  db.query(`SELECT resources.*, users.username, categories.name as category_name
            FROM resources
            JOIN users ON users.id = user_id
            JOIN categories ON categories.id = category_id`)
  .then(data => {
    const templateVars = { resources: data.rows };
    console.log('WALDO', templateVars);

    return res.render('home', templateVars);
  })
    .catch(err => console.log("dbQueryErr", err));

});

module.exports = router;

