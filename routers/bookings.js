const express = require('express');
const router = express.Router();
const { getAllBookings, getBookingById, createBooking, getBookingsByUserId, updateBooking, updateBookingByAdmin, deleteBooking, createBookingByAdmin } = require('../controllers/bookingController');
const checkToken = require('../middlewares/checkToken');
const authorize = require('../middlewares/authorize');
const Role = require('../_helpers/roles');

// api/v1/bookings

router.get('/', checkToken, authorize(Role.Admin), getAllBookings);
router.get('/:id', checkToken, authorize(), getBookingById);
router.get('/users/:user_id', checkToken, authorize(), getBookingsByUserId);
router.post('/', checkToken, authorize(), createBooking);
router.post('/admin', checkToken, authorize(Role.Admin), createBookingByAdmin);
router.put('/user/:user_id/:booking_id', checkToken, authorize(), updateBooking);
router.put('/admin/:booking_id', checkToken, authorize(Role.Admin), updateBookingByAdmin);
router.delete('/:id', checkToken, authorize(Role.Admin), deleteBooking);

module.exports = router;