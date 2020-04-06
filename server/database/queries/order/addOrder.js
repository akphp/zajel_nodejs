const connection = require('../../config/dbConnection');

exports.insertOrder = (placeId, customerAddress, customerPhone, customerName) => connection.query('INSERT INTO orders(fk_i_place_id, s_customer_address, s_customer_phone, customer_name) VALUES ($1 ,$2, $3, $4) RETURNING pk_i_id', [placeId, customerAddress, customerPhone, customerName]);
