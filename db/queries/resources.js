const db = require('../connection');

const searchResources = (text) => {
  return db.query(
    `SELECT * FROM resources WHERE title ILIKE $1 OR description ILIKE $1`,
    ['%'+text+'%'])

    .then(data => {
      return data.rows;
    });
};

const getCommentsByResourceID = (resourceID) => {
  return db.query('Select comments.*, users.username AS username FROM comments JOIN users ON users.id = comments.user_id where resource_id = $1;',[resourceID])
  .then(data => { 
    return data.rows
  }).catch((err) => {
    console.error(err)
  })
}

const getResourceById = (id) => {
  return db.query('SELECT resources.*,users.username AS username FROM resources JOIN users ON users.id = resources.user_id WHERE resources.id = $1', [id])
  .then((data) => {
    return data.rows[0]
  }).catch((err) => {
    console.error(err)
  })
}


module.exports = { searchResources, getCommentsByResourceID, getResourceById };
