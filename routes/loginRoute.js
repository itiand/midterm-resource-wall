
const { findUserByEmail, isLoggedIn, isUsersURL } = require('../lib/helpers');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  // res.send("Hello!")
  res.render('login');
});


router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Use the findUserByEmail function to find the user by email
  findUserByEmail(email)
    .then(user => {
      if (user) {
        console.log('userData', user);

        //if found check password
        if (user.password === password) {
          res.redirect('/home');
        } else {
          console.log('wrong password');
        }
      } else {
        //slide down --> user not found
      }
    })
    .catch(err => {
      res.status(500).send('Internal Server Error');
    });

});

module.exports = router;


