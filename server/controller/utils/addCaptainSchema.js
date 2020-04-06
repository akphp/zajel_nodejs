const Joi = require('@hapi/joi');

exports.schema = Joi.object().keys({
  name: Joi.string().regex(/^([أ-يa-zِA-Z0-9]|\s)*$/).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/^\+?[0-9]{10,12}$/).required(),
  licenceNumber: Joi.string().regex(/^[0-9]{7}$/).required(),
  IDNumber: Joi.string().regex(/^[0-9]{9}$/).required(),
  address: Joi.string().required(),
  password: Joi.string().required(),
  status: Joi.string().regex(/^(false|true)$/).required(),
});
