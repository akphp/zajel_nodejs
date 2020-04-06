const connection = require('../../config/dbConnection');

const editOrders = (phone, address, placeId, id) => connection.query(
  'UPDATE orders SET s_customer_phone = $1, s_customer_address = $2, fk_i_place_id = $3, dt_modified_date = CURRENT_DATE FROM places WHERE orders.pk_i_id = $4 RETURNING orders.pk_i_id',
  [phone, address, placeId, id],
);
module.exports = editOrders;
