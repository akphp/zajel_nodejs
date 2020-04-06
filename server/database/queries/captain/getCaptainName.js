const connection = require('../../config/dbConnection');

exports.selectCaptainsNames = () => connection.query('select pk_i_id, s_name from TUser where pk_i_id not in (SELECT TUser.pk_i_id FROM TUser inner join tuser_order ON tuser_order.tuser_id = TUser.pk_i_id inner join orders ON orders.pk_i_id = tuser_order.order_id where TUser.i_type = 1 and orders.i_status = 0) and i_type = 1');
