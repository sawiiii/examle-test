const express = require('express');
const router = express.Router();

const landing = require('./api/v1/landing.routes');

router.use('/', landing);

module.exports = router;