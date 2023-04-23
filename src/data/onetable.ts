import { pool } from '../index';

export const createTables = () => {
  const loginUser = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
    )`;
  pool
    .query(loginUser)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
})

module.exports = {
  createTables,
  pool,
};

require('make-runnable');