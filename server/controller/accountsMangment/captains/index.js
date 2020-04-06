const express = require('express');
const { getOrdersDetails } = require('./getCaptainOrders');
const { addCaptain } = require('./addCaptain');
const { getDetails } = require('./getCaptainDetails');
const { updateCaptain } = require('./editCaptain');
const { getCaptainsNames } = require('./getCaptaisnNames');
const { getCaptain } = require('./getCaptains.js');
const { deleteCaptain } = require('./deleteCaptain');

const router = express.Router();

router.route('/getCaptainOrders/:id')
  .get(getOrdersDetails);

router.route('/getCaptainDetails/:id')
  .get(getDetails);
router.route('/putCaptain/:id')
  .put(updateCaptain);
router.route('/addCaptain')
  .post(addCaptain);
router.route('/deleteCaptain/:id').delete(deleteCaptain);
router.route('/getCaptainsNames')
  .get(getCaptainsNames);
router.route('/captains').get(getCaptain);

module.exports = router;
