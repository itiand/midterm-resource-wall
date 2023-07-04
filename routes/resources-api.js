const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');

router.get('/', (req, res) => {
  resourceQueries.searchResources(req.query.text)
    .then(resources => {
      res.json({ resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
