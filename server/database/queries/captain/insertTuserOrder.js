const connection = require('../../config/dbConnection');

exports.insertTuserOrder = (captainID, OrderId) => connection.query('INSERT INTO TUser_order(tuser_id , order_id) VALUES ($1, $2)', [captainID, OrderId]);
