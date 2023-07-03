const db = require('../connection');


const searchResources = (text) => {
  return db.query(
    `SELECT * FROM resources WHERE title ILIKE $1 OR description ILIKE $1`,
    ['%'+text+'%'])

    .then(data => {
      return data.rows;
    });
};

module.exports = { searchResources };
