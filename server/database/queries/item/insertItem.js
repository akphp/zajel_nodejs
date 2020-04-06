const connection = require('../../config/dbConnection');

const insertItemQuery = (items, orderId) => {
  let sql = 'INSERT INTO items (fk_i_order_id, s_name, f_price) VALUES ';
  let v = 2;
  for (let i = 1; i < items.length; i++) {
    sql += `($1, $${v}, $${v + 1}),`;
    v += 2;
  }
  sql += `($1, $${v}, $${v + 1}) RETURNING pk_i_id as itemid, s_name as name, f_price as price`;
  const destructuredItems = [];
  items.forEach((element) => {
    destructuredItems.push(...Object.values(element));
  });
  return connection.query(sql, [orderId, ...destructuredItems]).then(res => res.rows);
};
module.exports = insertItemQuery;
