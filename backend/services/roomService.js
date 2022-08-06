const Room = require('../models/roomModels');

async function addBookingDates(room_id, bookingDays) {
    try {
        const room = await Room.findByIdAndUpdate(room_id,
            {
                $push: { bookingDates: bookingDays }
            }, { new: true });
        return room;
    } catch (err) {
        throw err;
    }
}

async function checkRoomAvailabilityForBooking(room_id, daysToBook) {
    try {
        const room = await Room.aggregate([{
            $match: {
                _id: room_id,
                bookingDates: { $nin: daysToBook }
            }
        }]);

        if (room.length > 0) {
            return room;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function resetRoomBookingDatesForGivenDays(room_id, previousBookingDates, newBookingDates) {
    try {
        await Room.findByIdAndUpdate(room_id,
            {
                $pull: { bookingDates: { $in: previousBookingDates } }
            }, { new: true });

        if (newBookingDates.length > 0) {
            await addBookingDates(room_id, newBookingDates);
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addBookingDates,
    checkRoomAvailabilityForBooking,
    resetRoomBookingDatesForGivenDays
}