const { getDetails } = require('../../../database/queries/captain/getCaptainDetails');

exports.getDetails = (req, res) => {
  const { id } = req.params;
  getDetails(id)
    .then(({ rows, rowCount }) => {
      if (!rowCount) {
        res.status(404).send({ notFound: 'Not Found' });
      } else res.send({ result: rows });
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
};
