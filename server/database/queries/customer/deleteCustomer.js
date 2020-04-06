const connect = require('../../config/dbConnection');

const deleteCustomerQuery = id => connect.query('DELETE FROM tuser WHERE pk_i_id = $1', [id]);
module.exports = { deleteCustomerQuery };
