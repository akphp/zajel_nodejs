const connect = require('../../config/dbConnection');

const getCaptains = () => {
  const sql = 'SELECT * FROM tuser where i_type=1';
  return connect.query(sql);
};
module.exports = { getCaptains };
