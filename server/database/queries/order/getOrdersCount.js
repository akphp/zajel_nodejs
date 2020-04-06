const connection = require('../../config/dbConnection');

exports.countOrders = () => connection.query('SELECT COUNT(pk_i_id) FROM orders');
