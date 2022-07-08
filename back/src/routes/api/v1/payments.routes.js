const express = require('express');

const router = express.Router();
const paymentsController = require('../../../controllers/payments');

router.get('', paymentsController.getData);
router.get('/filter', paymentsController.filters);

module.exports = router;