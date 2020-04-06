const { selectPlacesNames } = require('../../database/queries/place/getPlaceName');

exports.getPlacesNames = (req, res) => {
  selectPlacesNames()
    .then(({ rows }) => {
      res.send({ result: rows });
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
};
