const bcrypt = require('bcryptjs');
const joi = require('@hapi/joi');
const {
  editcustomer,
} = require('../../../database/queries/customer/editCustomer');
const {
  checkCustomers,
} = require('../../../database/queries/customer/checkCustomer');
const { editCustomerWithPassword, editCustomerWithOutPassword } = require('../../utils/editCustomerSchema');

const editCustomer = (req, res) => {
  const {
    id,
    name,
    email,
    phone,
    status,
    address,
    password,
  } = req.body;
  if (password) {
    const { error: errorValidation } = joi.validate({
      name, email, phone, address, password, status,
    }, editCustomerWithPassword);
    if (errorValidation !== null) {
      return res.status(400).send({ error: 'Bad request' });
    }
  } else {
    const { error: errorValidation } = joi.validate({
      name, email, phone, address, status,
    }, editCustomerWithOutPassword);
    if (errorValidation !== null) {
      return res.status(400).send({ error: 'Bad request' });
    }
  }
  checkCustomers(email)
    .then(({
      rows,
    }) => {
      if (!rows.length || rows[0].pk_i_id === id) {
        if (password) {
          const hashNewPassword = bcrypt.hashSync(password, 5);
          editcustomer(
            id,
            name,
            email,
            phone,
            status,
            address,
            hashNewPassword,
          ).then(resultEdit => res.status(200).send({
            result: resultEdit.rows,
          }));
        } else {
          editcustomer(
            id,
            name,
            email,
            phone,
            status,
            address,
            password,
          )
            .then((resultEdit) => {
              res.status(200).send({
                result: resultEdit.rows,
              });
            })
            .catch(() => {
              res.status(500).send({
                error: 'internal server error',
              });
            });
        }
      } else {
        res.status(400).send({
          error: 'هذا الايميل مستخدم مسبقا',
        });
      }
    })
    .catch(() => res.status(500).send({
      error: 'internal server error',
    }));
};

module.exports = {
  editCustomer,
};
