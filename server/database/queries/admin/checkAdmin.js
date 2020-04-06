const connection = require('../../config/dbConnection');

exports.getAdmin = username => connection.query('select * from users where user_name = $1', [username]);
