const express = require('express');

const router = express.Router();
const staffController = require('../../../controllers/staff');

router.get('', staffController.getData);
router.get('/filter', staffController.filters);

module.exports = router;