const {
  getCaptains,
} = require('../../../database/queries/captain/getCaptains');

const getCaptain = (request, response) => {
  getCaptains()
    .then((res) => {
      if (res.rows) {
        response.status(200).send({ result: res.rows });
      }
    })
    .catch(() => {
      response.status(500).send({ error: 'Internal Server Error' });
    });
};
module.exports = { getCaptain };
