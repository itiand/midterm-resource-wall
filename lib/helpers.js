const db = require('../db/connection');

// function to find a user by email in your users database
const findUserByEmail = (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  return db.query(query, values)
    .then(result => result.rows[0]) // first matching user, or undefined if not found
    .catch(err => {
      throw new Error('Error retrieving user from database');
    });
};

const isLoggedIn = function(reqBodyObj) {
  if (!Object.keys(reqBodyObj.session).includes('user_id')) return false;
  return true;
};

const isUsersURL = function(urlID, usersURLObj) {
  return Object.keys(usersURLObj).includes(urlID);
};

module.exports = {
  findUserByEmail,
  isLoggedIn,
  isUsersURL
};
