const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getCommentsByResourceID, getResourceById} = require("../db/queries/resources")


router.get('/:id', async (req, res) => {
    try {
      const resource = await getResourceById(req.params.id)
      const comments = await getCommentsByResourceID(req.params.id)
      console.log("resource ----", resource)
      console.log("comments ----", comments)
      const templateVars = { resource, comments };
      
      return res.render('resourcepage', templateVars);
    } catch (err) {
      console.log("err", err)
    }
});

router.post('/:id/like', (req, res) => {
    let id = req.params.id
    const user_id = req.session.user_id 
    // const user_id = 1
    db.query('INSERT INTO favourites (resource_id, user_id) VALUES ($1, $2);',[id, user_id]).then(data => {
        res.send({message:"Resource Liked"})
      })
        .catch(err => console.log("dbQueryErr", err));
});
router.get('/:id/comment', (req, res) => {
    let id = req.params.id
    console.log("inside----------")
    const user_id = req.session.user_id
    // const user_id = 1
    db.query('Select * from comments where resource_id = $1 and  user_id = $2;',[id, user_id]).then(data => {
        const templateVars = { comments: data.rows[0]};
        console.log('comments-------------', data.rows);
        return res.render('resourcepage', templateVars);
      })
        .catch(err => console.log("dbQueryErr cannot grab comments", err));
});
router.post('/:id/comment', (req, res) => {
    let id = req.params.id
    let comment = req.body.comment
    console.log(comment)
    const user_id = req.session.user_id
    // const user_id = 1
    db.query('INSERT INTO comments (resource_id, user_id, comment) VALUES ($1, $2, $3);',[id, user_id,comment]).then(data => {
        res.send({message:"Resource Comment"})
       
      })
        .catch(err => console.log("dbQueryErr", err));
});

router.post('/:id/rate', (req, res) => {
    const id = req.params.id;
    const rating = req.body.rating;
    const user_id = req.session.user_id
    // const user_id = 1
console.log("rating in backend post", rating)
    db.query('INSERT INTO ratings (resource_id, user_id, number_rating) VALUES ($1, $2, $3);', [id, user_id, rating])
      .then(data => {
        res.send({ message: "Resource Rated" });
      })
      .catch(err => {
        console.log("dbQueryErr", err);
        res.status(500).send({ error: "An error occurred while rating the resource" });
      });
  });


module.exports = router