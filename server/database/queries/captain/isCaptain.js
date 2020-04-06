const connect = require('../../config/dbConnection');

const checkEmail = (email) => {
  const values = [email];
  const sql = {
    text: 'SELECT * FROM tuser where i_type=1 AND s_email= $1',
    values,
  };
  return connect.query(sql);
};
module.exports = { checkEmail };
