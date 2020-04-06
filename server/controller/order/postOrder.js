const Joi = require('@hapi/joi');
const { insertOrder } = require('../../database/queries/order/addOrder');
const { insertTuserOrder } = require('../../database/queries/captain/insertTuserOrder');
const { insertItem } = require('../../database/queries/item/insertItemOrder');
const { schema } = require('../../controller/utils/addOrderValadation');

exports.postOrder = (req, res) => {
  const { error } = Joi.validate(req.body, schema);
  const {
    address, items, phone, customerName, placeId, captainId,
  } = req.body;
  if (error !== null) {
    return res.status(400).send({ error: 'Bad Request' });
  }
  let orderId;
  insertOrder(placeId, address, phone, customerName)
    .then(({ rows }) => {
      orderId = rows[0].pk_i_id;
      return insertTuserOrder(captainId, orderId);
    })
    .then(() => insertItem(orderId, items.filter(item => item !== null)))
    .then(() => {
      res.status(201).send({ result: { id: orderId, ...req.body } });
    })
    .catch(() => {
      res.status(500).send({ error: 'Internal Server Error' });
    });
};
