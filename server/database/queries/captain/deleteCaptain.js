const connect = require('../../config/dbConnection');

const deleteCaptainQuery = id => connect.query('DELETE FROM tuser WHERE pk_i_id = $1', [id]);

module.exports = { deleteCaptainQuery };
