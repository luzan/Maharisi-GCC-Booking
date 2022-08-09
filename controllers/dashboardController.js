const Room = require('../models/roomModels')
const Booking = require('../models/bookingModel')
const User = require('../models/userModels')

async function getBannerSummary(req, res, next) {
    try {
        // count of rooms
        // const room = await Room.find().count();
        // count of bookings
        // count of today checkin
        // count of users
        const roomCount = await Room.countDocuments({});
        const bookingCount = await Booking.countDocuments({});
        const userCount = await User.countDocuments({});
        const checkinCount = await Booking.countDocuments({ checkInDate: new Date().setHours(0, 0, 0, 0) });

        res.status(200).json({
            message: `Summary found successfully`,
            data: {
                roomCount,
                bookingCount,
                userCount,
                checkinCount
            }
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getBannerSummary
}