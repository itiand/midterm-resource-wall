const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();

router.use(cookieSession({
  name: 'session',
  keys: ['barney', 'is', 'a', 'dinosaur', 'mary had a little', 'lamb']
}));


router.post('/', (req, res) => {

  //clear cookie session
  //redirect
  req.session = null;
  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
