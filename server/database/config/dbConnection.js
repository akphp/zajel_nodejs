const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

let dbURL = process.env.DB_LOCAL;

if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_HEROKU;
} else {
  dbURL = process.env.DB_LOCAL;
}

if (!dbURL) {
  throw new Error('No Database !');
}

const urlParams = url.parse(dbURL);
const [username, password] = urlParams.auth.split(':');

const option = {
  user: username,
  password,
  database: urlParams.path.split('/')[1],
  host: urlParams.hostname,
  port: urlParams.port,
  ssl: !(urlParams.hostname === 'localhost'),
};

module.exports = Pool(option);
