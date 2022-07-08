const express = require('express');

const router = express.Router();
const salesController = require('../../../controllers/sales');

router.get('', salesController.getData);
router.get('/filter', salesController.filters);
router.get('/:id', salesController.showSale);

module.exports = router;