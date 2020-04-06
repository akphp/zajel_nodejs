const joi = require('@hapi/joi');

exports.editCaptainSchema = joi.object().keys({
  name: joi.string().regex(/^[أ-يA-Za-z0-9\s]*$/).required(),
  email: joi.string().email().required(),
  phone: joi.string().regex(/^\+?[0-9.-\s]{10,16}$/).required(),
  address: joi.string().regex(/^[أ-يA-Za-z0-9.-_\s]*$/).required(),
  IDNumber: joi.string().regex(/^[0-9]{9}$/).required(),
  licenceNumber: joi.string().regex(/^[0-9]{7}$/).required(),
  status: joi.string().regex(/^(false|true)$/).required(),
  password: joi.string(),
});
