const connection = require('../../config/dbConnection');

exports.selectPlacesNames = () => connection.query('SELECT pk_i_id, s_name FROM places');
