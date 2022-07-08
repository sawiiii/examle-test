const express = require('express');

const router = express.Router();
const productsController = require('../../../controllers/products');

router.get('', productsController.getData);
router.get('/filter', productsController.filters);

module.exports = router;