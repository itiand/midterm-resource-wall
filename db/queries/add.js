const db = require('../connection');

const addResource = (title, url, description, category_id, user_id, photo_url) => {
  return db.query(
    `INSERT INTO resources (title, url, description, category_id, user_id, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
    [title, url, description, category_id, user_id, photo_url])

    // .then(data => {
    //   return data.rows;
    // });
};

module.exports = { addResource };
