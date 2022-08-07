const Booking = require('../models/bookingModel');

async function getCostInformationFromBooking(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return false;
    }
    const { cost } = booking;
    return cost;
}

module.exports = {
    getCostInformationFromBooking
}