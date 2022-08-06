const express = require('express');
const router = express.Router();
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const checkToken = require('../middlewares/checkToken');
// api/v1/bookings

router.get('/', checkToken, getAllBookings);
router.get('/:id', checkToken, getBookingById);
router.post('/', checkToken, createBooking);
router.put('/:id', checkToken, updateBooking);
router.delete('/:id', checkToken, deleteBooking);

module.exports = router;