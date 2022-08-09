const express = require('express');
const router = express.Router();
const { getAllPayments, getPaymentById, getAllPaymentByUserId, createPaymentForBookingByAdmin, createPaymentForBookingByUser } = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');
const checkToken = require('../middlewares/checkToken');
const Role = require('../_helpers/roles');
// /api/v1/payments

router.get('/', checkToken, authorize(Role.Admin), getAllPayments);
router.get('/:id', checkToken, authorize(), getPaymentById);
router.get('/users/:user_id', checkToken, authorize(), getAllPaymentByUserId);
router.post('/bookings/:booking_id/admin', checkToken, authorize(Role.Admin), createPaymentForBookingByAdmin);
router.post('/bookings/:booking_id/user', checkToken, authorize(), createPaymentForBookingByUser);
// router.put('/:id', updatePayment);
// router.delete('/:id', deletePayment);

module.exports = router;
