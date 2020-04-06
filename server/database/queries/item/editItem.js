const connection = require('../../config/dbConnection');

const updateItemQuery = (item, date, price, id) => connection.query(
  'UPDATE items SET s_name = $1, dt_modified_date = $2, f_price = $3 WHERE  fk_i_order_id = $4',
  [item, date, price, id],
);
module.exports = updateItemQuery;
