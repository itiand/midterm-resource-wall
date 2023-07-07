const db = require('../connection');

const getUsers = (id) => {
  return db.query(`SELECT * FROM users WHERE id = ${id};`)///
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


const updateUsers = (name, username, email, password, id) => {
  return db.query(
    `UPDATE users SET name = $1, username=$2, email=$3, password=$4
    WHERE id = ${id};`,               //will need to set this to cookie
    [name, username, email, password])

    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUser = (name, username, email, password) => {
  return db.query(
    `INSERT INTO users (name, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [name, username, email, password])
    .then(data => {
      return { user: data.rows[0] };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getUsers, updateUsers, addUser };
