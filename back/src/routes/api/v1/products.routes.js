const express = require('express');

const router = express.Router();
const productsController = require('../../../controllers/products');

router.get('', productsController.getData);
router.get('/filter', productsController.filters);
// router.get('/:id', salesController.showSale);

module.exports = router;