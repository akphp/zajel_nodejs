const connection = require('../../config/dbConnection');

const deleteItemQuery = (itemsIds) => {
  let sql = 'DELETE FROM items WHERE pk_i_id IN (';
  for (let i = 1; i < itemsIds.length; i++) {
    sql += `$${i.toString()},`;
  }
  sql = `${sql}$${itemsIds.length})`;
  return connection.query(sql, itemsIds);
};

module.exports = deleteItemQuery;
