/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');

router.use(cookieSession({
  name: 'session',
  keys: ['barney', 'is', 'a', 'dinosaur', 'mary had a little', 'lamb']
}));


router.get('/', (req, res) => {

  // db.query('SELECT * FROM users').then(data => {
  //   const templateVars = { users: data.rows };
  //   console.log('WALDO', templateVars);
  return res.render('signup');

  //.catch(err => console.log("dbQueryErr", err));

});

router.post('/', (req, res) => {
  console.log("from post in routes", req.body);
  userQueries.
    addUser(req.body.name, req.body.username, req.body.email, req.body.password)
    .then (data => {
        console.log('added user', data.user.id );
        req.session.user_id = data.user.id;
      res.status(200).json({ message: 'Login successful' });
    })
    .catch(err => console.log("dbQueryErr", err));
});

module.exports = router;
