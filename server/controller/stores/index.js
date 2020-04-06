const getStoresQuery = require('../../database/queries/place/getStores');

exports.getStores = (req, res) => {
  getStoresQuery().then(result => res.status(200).send(result)).catch(() => res.status(500).send('Internal server error'));
};
