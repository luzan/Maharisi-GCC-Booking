const express = require('express');
const authorize = require('../middlewares/authorize');
const checkToken = require('../middlewares/checkToken');
const router = express.Router()
const Role = require('../_helpers/roles')
const { getBannerSummary } = require('../controllers/dashboardController')

router.get('/summary', checkToken, authorize(Role.Admin), getBannerSummary);

module.exports = router