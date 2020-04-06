const { getCustomers } = require('../../../database/queries/customer/getCustomers');

const getCustomer = (request, response) => {
  getCustomers()
    .then((res) => {
      if (res.rows) {
        response.status(200).send({ result: res.rows });
      }
    })
    .catch(() => {
      response.status(500).send({ error: 'Internal Server Error' });
    });
};
module.exports = { getCustomer };
