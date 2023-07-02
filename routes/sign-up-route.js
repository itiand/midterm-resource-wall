/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  db.query('SELECT * FROM users').then(data => {
    const templateVars = { users: data.rows };
    console.log('WALDO', templateVars);
    return res.render('signup', templateVars);
  })
    .catch(err => console.log("dbQueryErr", err));

});

router.post('/', (req, res) => {
  console.log("waldo", req.body);
  // db.query(`INSERT INTO users (name, username, email) VALUES (${req.body.name}, ${req.body.username}, ${req.body.email}) RETURNING *;`)
  //   .then(data => {
  //   console.log('WALI', data.rows);
  //   // console.log('', data.rows)
  //   // const templateVars = {users: data.rows}
  //   // console.log('WALDO', templateVars);
  //   return res.render('index');
  // })
  // .catch(err => console.log("dbQueryErr", err));


  const { name, username, email } = req.body;
  db.query('INSERT INTO users (name, username, email) VALUES ($1, $2, $3) RETURNING *;', [name, username, email])
    .then(data => {
      console.log('WALI', data.rows);
      const templateVars = { users: data.rows };
      return res.render('homepagethatdoesnotexistyet', templateVars);
    })
    .catch(err => console.log("dbQueryErr", err));


});
// INSERT INTO users (name, username, email) VALUES ('Chris', 'Del', 'chris@gmail.com');


module.exports = router;
