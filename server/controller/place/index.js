const express = require('express');

const { getPlacesNames } = require('./getPlacesNames');

const router = express.Router();

router.route('/getPlacesNames')
  .get(getPlacesNames);

module.exports = router;
