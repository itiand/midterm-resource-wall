const express = require('express');
const router = express.Router();
const db = require('../db/connection');


router.get('/:id', (req, res) => {
    let id = req.params.id
    db.query('SELECT * FROM resources WHERE id = $1',[id]).then(data => {
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

module.exports = router;