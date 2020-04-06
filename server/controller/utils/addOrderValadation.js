const Joi = require('@hapi/joi');


exports.schema = Joi.object().keys({
  address: Joi.string().required(),
  items: Joi.required(),
  phone: Joi.string().regex(/^\+?[0-9]{10,12}$/).required(),
  customerName: Joi.string().regex(/^([أ-يa-zA-Z0-9]|\s)*$/).required(),
  placeId: Joi.number().required(),
  captainId: Joi.number().required(),

});
