const Joi = require('@hapi/joi');

exports.schema = Joi.object().keys({
  name: Joi.string().regex(/^([أ-يa-zِA-Z0-9]|\s)*$/).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/^\+?[0-9]{12}$/).required(),
  address: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.boolean().required(),
});
