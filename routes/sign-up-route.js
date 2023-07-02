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
  db.query('')
  res.render('signup');
});

module.exports = router;


