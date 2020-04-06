const connection = require('../../config/dbConnection');

const editCaptain = (captainInfo, id) => {
  const {
    name, email, phone, address, IDNumber, licenceNumber, status, newName, pass,
  } = captainInfo;
  if (!pass) {
    return connection.query('UPDATE TUser SET s_name = $1, s_email = $2, s_mobile_number = $3, s_address = $4, s_id_number = $5, s_driver_licence_number = $6, b_status = $7, s_image = $8, dt_modified_date = $9 WHERE pk_i_id = $10 RETURNING *', [name, email, phone, address, IDNumber, licenceNumber, status, newName, new Date(Date.now()), id]);
  }
  return connection.query('UPDATE TUser SET s_name = $1, s_email = $2, s_mobile_number = $3, s_address = $4, s_id_number = $5, s_driver_licence_number = $6, b_status = $7, s_image = $8, dt_modified_date = $9, s_password = $10  WHERE pk_i_id = $11 RETURNING *', [name, email, phone, address, IDNumber, licenceNumber, status, newName, new Date(Date.now()), pass, id]);
};

module.exports = { editCaptain };
