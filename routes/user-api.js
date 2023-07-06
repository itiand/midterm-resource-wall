const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => {
 console.log("getting user")
  userQueries.getUsers()         //returns an obj of all users
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) =>{
  console.log("request req.body", req.body)
  userQueries.                       //alters rows in resource db
  updateUsers(req.body.name,req.body.username, req.body.email, req.body.password)
  console.log("from user route POST", req.body)
    //alert(`You have sucessfulyl changed your profile 👍 `)
});


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
