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

  // res.send("Hello!")
  // db.query('SELECT * FROM users')
  //                               .then(data => console.log('WALDO', data))
  //                               .catch(err => console.log(err));
  // return res.render('signup');

  db.query('SELECT * FROM users').then(data => {
    const templateVars = {users: data.rows}
    console.log('WALDO', templateVars);
    return res.render('signup', templateVars);
  })
  .catch(err => console.log("dbQueryErr", err));

});

module.exports = router;
