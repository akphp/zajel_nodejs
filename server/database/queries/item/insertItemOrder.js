const format = require('pg-format');

const connection = require('../../config/dbConnection');

exports.insertItem = (id, arrayItem) => {
  const arrayValues = arrayItem.map(item => [item, id]);
  const sql = format('INSERT INTO items(s_name, fk_i_order_id) VALUES %L', arrayValues);
  return connection.query(sql);
};
