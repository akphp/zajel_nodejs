const connect = require('../../config/dbConnection');

const checkCustomers = (email) => {
  const values = [email];
  const sql = {
    text: 'SELECT * FROM tuser where i_type=2 AND s_email = $1 ',
    values,
  };
  return connect.query(sql);
};
module.exports = { checkCustomers };
