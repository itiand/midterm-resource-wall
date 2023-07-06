const cookieSession = require('cookie-session');
const express = require('express');
const router = express.Router();
const addResourceQueries = require('../db/queries/add');


router.use(cookieSession({
  name: 'session',
  keys: ['barney', 'is', 'a', 'dinosaur', 'mary had a little', 'lamb']
}));

router.post('/', (req, res) => {
  const user_id = req.session.user_id;
  addResourceQueries
    .addResource(req.body.title, req.body.url, req.body.description, parseInt(req.body.category_id), user_id, req.body.photo_url)
    .then((data) => {
      const id = data[0].id
      console.log("id now", id, data)
      res.redirect(`/resource/${id}`) //to resource/:id ????
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});
module.exports = router;
