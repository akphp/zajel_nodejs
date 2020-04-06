const connect = require('../../config/dbConnection');

const getCustomers = () => {
  const sql = 'SELECT * FROM tuser where i_type=2';
  return connect.query(sql);
};
module.exports = { getCustomers };
