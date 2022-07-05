const express = require('express');

const router = express.Router();
const landingController = require('../../../controllers/landings');

router.get('', landingController.get_info);

module.exports = router;