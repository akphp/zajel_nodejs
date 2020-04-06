const connection = require('../../config/dbConnection');

exports.getOrders = id => connection.query('select orders.pk_i_id from orders inner join tuser_order ON tuser_order.order_id = orders.pk_i_id where tuser_order.tuser_id = $1', [id]);
