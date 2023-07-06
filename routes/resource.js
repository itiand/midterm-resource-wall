const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    console.log("ids", id, req.params.id)
    db.query('SELECT resources.*,users.username AS username FROM resources JOIN users ON users.id = resources.user_id WHERE resources.id = $1',[id]).then(data => {
        const templateVars = { resource: data.rows[0]};
        console.log('WALDO RESOURCE', templateVars);
        return res.render('resourcepage', templateVars);
      })
        .catch(err => console.log("dbQueryErr", err));
});

router.post('/:id/like', (req, res) => {
    let id = req.params.id
    // const userid = req.session.userid
    const user_id = 1
    db.query('INSERT INTO favourites (resource_id, user_id) VALUES ($1, $2);',[id, user_id]).then(data => {
        res.send({message:"Resource Liked"})
      })
        .catch(err => console.log("dbQueryErr", err));
});
router.get('/:id/comment', (req, res) => {
    let id = req.params.id
    // const userid = req.session.userid
    const user_id = 1
    db.query('Select * from comments where resource_id = $1 and  user_id = $2;',[id, user_id]).then(data => {
        const templateVars = { comments: data.rows[0]};
        console.log('comments', templateVars);
        return res.render('resourcepage', templateVars);
      })
        .catch(err => console.log("dbQueryErr cannot grab comments", err));
});
router.post('/:id/comment', (req, res) => {
    let id = req.params.id
    let comment = req.body.comment
    console.log(comment, req,req.body)
    // const userid = req.session.userid
    const user_id = 1
    db.query('INSERT INTO comments (resource_id, user_id, comment) VALUES ($1, $2, $3);',[id, user_id,comment]).then(data => {
        res.send({message:"Resource Comment"})

      })
        .catch(err => console.log("dbQueryErr", err));
});

router.post('/:id/rate', (req, res) => {
    const id = req.params.id;
    const rating = req.body.rating;
    // const user_id = req.session.userid;
    const user_id = 1
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
