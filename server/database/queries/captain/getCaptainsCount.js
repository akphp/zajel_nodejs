const connection = require('../../config/dbConnection');

exports.countCaptains = () => connection.query('SELECT COUNT(pk_i_id) FROM tuser WHERE i_type = 1');
