
const { findUserByEmail, isLoggedIn, isUsersURL } = require('../lib/helpers');
const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();


router.use(cookieSession({
  name: 'session',
  keys: ['barney', 'is', 'a', 'dinosaur', 'mary had a little', 'lamb']
}));

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // use the findUserByEmail function to find the user by email
  findUserByEmail(email)
    .then(user => {
      if (user) {
        console.log('userData', user);

        if (user.password === password) {
          req.session.user_id = user.id
          // Login successful, respond with a success message
          return res.json({ message: 'Login successful' });
        }
      }
      // login failed, give an error message
      res.status(401).json({ error: 'Incorrect email or password' });
    })
    .catch(err => {
      res.status(500).send('Internal Server Error', err);
    });
});


module.exports = router;


