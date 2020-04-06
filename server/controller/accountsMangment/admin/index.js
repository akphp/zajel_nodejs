const express = require('express');

const { checkAdmin } = require('./checkLogin');
const { getName } = require('./getName');
const { logout } = require('./logout');

const router = express.Router();

router.route('/login')
  .post(checkAdmin);
router.route('/getName')
  .get(getName);
router.route('/logout')
  .get(logout);
module.exports = router;
