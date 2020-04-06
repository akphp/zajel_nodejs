const connect = require('../../config/dbConnection');

const addcustomer = (name, email, phone, status, address, password) => {
  const sql = {
    text: 'INSERT INTO tuser (s_name ,s_mobile_number,s_email,b_status,s_address,i_type,s_password) values($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    values: [name, phone, email, status, address, 2, password],
  };
  return connect.query(sql);
};
module.exports = { addcustomer };
