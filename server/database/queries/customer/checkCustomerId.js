const connect = require('../../config/dbConnection');

const checkCustomerId = (id) => {
  const values = [id];
  const sql = {
    text: 'SELECT * FROM tuser where i_type=2 AND pk_i_id = $1 ',
    values,
  };
  return connect.query(sql);
};
module.exports = { checkCustomerId };
