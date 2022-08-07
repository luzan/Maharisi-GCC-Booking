const express = require('express');
const router = express.Router();
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const checkToken = require('../middlewares/checkToken');
const authorize = require('../middlewares/authorize');
const Role = require('../_helpers/roles');

// api/v1/bookings

router.get('/', checkToken, authorize(Role.Admin), getAllBookings);
router.get('/:id', checkToken, authorize(), getBookingById);
router.post('/', checkToken, authorize(), createBooking);
router.put('/:user_id/:booking_id', checkToken, authorize(), updateBooking);
router.delete('/:id', checkToken, authorize(Role.Admin), deleteBooking);

module.exports = router;