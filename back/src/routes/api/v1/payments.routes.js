const express = require('express');

const router = express.Router();
const paymentsController = require('../../../controllers/payments');

router.get('', paymentsController.getData);
router.get('/filter', paymentsController.filters);
// router.get('/:id', salesController.showSale);

module.exports = router;