const { hash } = require('bcryptjs');
const { addcustomer } = require('../../../database/queries/customer/addCustomer');
const { checkCustomers } = require('../../../database/queries/customer/checkCustomer');
const { schema } = require('../../utils/addCustomerSchema');
const joi = require('@hapi/joi');

const addNewCustomer = (req, res) => {
  const { error: validatError } = joi.validate(req.body, schema);
  if (validatError !== null) {
    return res.status(400).send({ error: 'خطأ في ارسال البيانات' });
  }
  const {
    name, email, phone, status, address, password,
  } = req.body;
  checkCustomers(email).then((response) => {
    if (response.rows.length > 0) {
      res.status(400).send({ error: 'البريد الالكتروني مستخدم سابقا ' });
    } else if (password) {
      hash(password, 5, (error, pass) => {
        if (error)res.status(400).send({ error: 'الرجاء ارسال البيانات مرة اخرى' });
        else {
          addcustomer(name, email, phone, status, address, pass)
            .then((result) => {
              if (result.rows) res.status(200).send({ result: result.rows });
            })
            .catch((errorInsert) => {
              if (errorInsert.constraint === 'tuser_s_email_key')res.status(409).send({ error: 'الايميل مستخدم مسبقا' });
              else res.status(500).send({ error: 'internal server error' });
            });
        }
      });
    }
  }).catch(error => res.status(500).send({ error: 'internal server error' }));
};
module.exports = { addNewCustomer };
