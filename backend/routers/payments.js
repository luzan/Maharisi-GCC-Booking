const express = require('express');
const router = express.Router();
const { getAllPayments, getPaymentById, createPaymentForBooking } = require('../controllers/paymentController');
// /api/v1/payments

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/booking/:booking_id', createPaymentForBooking);
// router.put('/:id', updatePayment);
// router.delete('/:id', deletePayment);

module.exports = router;
