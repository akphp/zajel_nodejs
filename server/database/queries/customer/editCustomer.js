const connect = require('../../config/dbConnection');

const editcustomer = (id, name, email, phone, status, address, password) => {
  let sql = '';
  if (password) {
    sql = {
      text: 'UPDATE  tuser SET s_name=$2,s_mobile_number=$3,s_email=$4,b_status=$5,s_address=$6,i_type=$7,s_password=$8,dt_modified_date=$9 WHERE pk_i_id=$1 RETURNING *',
      values: [id, name, phone, email, status, address, 2, password, new Date(Date.now())],
    };
  } else {
    sql = {
      text: 'UPDATE  tuser SET s_name=$2,s_mobile_number=$3,s_email=$4,b_status=$5,s_address=$6,i_type=$7 ,dt_modified_date=$8 WHERE pk_i_id=$1 RETURNING *',
      values: [id, name, phone, email, status, address, 2, new Date(Date.now())],
    };
  }
  return connect.query(sql);
};
module.exports = { editcustomer };
