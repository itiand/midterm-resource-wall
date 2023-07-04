const express = require('express');
const router  = express.Router();
const addResourceQueries = require('../db/queries/add');



router.get('/', (req, res) => {
  // res.send("Hello!")
 res.render('add-resource');
});

router.post('/', (req, res) => {
  const user_id = 1
  addResourceQueries.addResource(req.body.title, req.body.url, req.body.description, req.body.category_id, user_id, req.body.photo_url)
    .then(() => {
      res.redirect("/") //to resource/:id ????
    })
})


module.exports = router;
