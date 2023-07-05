const express = require('express');
const router  = express.Router();
const addResourceQueries = require('../db/queries/add');



router.get('/', (req, res) => {
  // res.send("Hello!")
 res.render('add-resource');
});



router.post("/", (req, res) => {
  const resource = req.body;
  const user_id = 1  // will need to be a cookie

  addResourceQueries
      .addResource(resource.title, resource.url, resource.description, resource.category_id, user_id, resource.photo_url)
   //this funct has a hard coded user_id
      .then(() => {
    res.redirect("/") //to resource/:id ????
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});
module.exports = router;
