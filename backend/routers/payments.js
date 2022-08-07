const express = require('express');
const router = express.Router();
const { getAllPayments, getPaymentById, createPaymentForBooking } = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');
const checkToken = require('../middlewares/checkToken');
const Role = require('../_helpers/roles');
// /api/v1/payments

router.get('/', checkToken, authorize(Role.Admin), getAllPayments);
router.get('/:id', checkToken, authorize(), getPaymentById);
router.post('/booking/:booking_id', checkToken, authorize(), createPaymentForBooking);
// router.put('/:id', updatePayment);
// router.delete('/:id', deletePayment);

module.exports = router;
