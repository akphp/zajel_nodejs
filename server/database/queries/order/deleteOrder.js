const connection = require('../../config/dbConnection');

exports.deleteOrder = id => connection.query('DELETE FROM orders WHERE pk_i_id = $1', [id]);
