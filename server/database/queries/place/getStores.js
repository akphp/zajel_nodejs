const connection = require('../../config/dbConnection');

const getStoresQuery = () => connection.query('SELECT places.pk_i_id as id, places.s_name as value, places.s_name as label FROM places').then(res => res.rows);

module.exports = getStoresQuery;
