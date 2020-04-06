const { deleteCustomerQuery } = require('../../../database/queries/customer/deleteCustomer');

const deleteCustomer = (req, res) => {
  const { id } = req.params;
  if (id) {
    deleteCustomerQuery(id).then(() => res.send({ result: 'تم الحذف' }))
      .catch(err => res.status(500).send({ error: 'Internal Server Error' }));
  } else res.status(400).send({ error: 'لم يتم الحذف' });
};
module.exports = { deleteCustomer };
