const express = require('express');
const router = express.Router();

const landing = require('./api/v1/landing.routes');
const sales = require('./api/v1/sales.routes');
const payments = require('./api/v1/payments.routes');
const products = require('./api/v1/products.routes');

router.use('/', landing);
router.use('/sales', sales);
router.use('/payments', payments);
router.use('/products', products);

module.exports = router;