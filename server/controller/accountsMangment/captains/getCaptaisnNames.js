const { selectCaptainsNames } = require('../../../database/queries/captain/getCaptainName');

exports.getCaptainsNames = (req, res) => {
  selectCaptainsNames()
    .then(({ rows }) => {
      res.send({ result: rows });
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
};
