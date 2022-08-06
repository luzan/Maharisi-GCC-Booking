const Booking = require('../models/bookingModel');
const RoomService = require('../services/roomService');
const { createArrayOfDays, sanitizeDate } = require('../utils/dateUtils');

async function getAllBookings(req, res, next) {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            bookings: bookings
        });
    } catch (err) {
        next(err);
    }
}

async function getBookingById(req, res, next) {
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json({
            booking: booking
        });
    } catch (err) {
        next(err);
    }
}

async function createBooking(req, res, next) {
    try {
        const {
            roomId, userId, firstName, lastName, email,
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime
        } = req.body;

        let daysToBook = createArrayOfDays(checkInDate, checkOutDate);

        const roomAvailable = await RoomService.checkRoomAvailabilityForBooking(roomId, daysToBook);

        if (roomAvailable) {
            const totalPrice = roomAvailable.pricePerNight * daysToBook.length;
            const booking = {
                room: {
                    room_id: roomId,
                    roomNumber: roomAvailable.roomNumber,
                },
                user: {
                    user_id: userId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                },
                numberOfGuests: numberOfGuests,
                accessibleRequired: accessibleRequired,
                checkInDate: sanitizeDate(checkInDate),
                checkOutDate: sanitizeDate(checkOutDate),
                arrivalTime: arrivalTime ? arrivalTime : null,
                departureTime: departureTime ? departureTime : null,
                cost: {
                    regularPrice: totalPrice,
                    totalPrice: totalPrice,
                }
            }
            const bookingResponse = await Booking.create(booking);
            RoomService.addBookingDates(roomId, daysToBook);
            res.status(201).json({
                message: `Booking created successfully`, booking: bookingResponse
            });
        } else {
            res.status(400).json({
                message: `Room is already booked`
            });
        }
    } catch (err) {
        next(err);
    }
}

async function updateBooking(req, res, next) {
    try {
        const {
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime
        } = req.body;

        let data = {};
        numberOfGuests ? data.numberOfGuests = numberOfGuests : null;
        accessibleRequired ? data.accessibleRequired = accessibleRequired : null;
        arrivalTime ? data.arrivalTime = arrivalTime : null;
        departureTime ? data.departureTime = departureTime : null;
        checkInDate ? data.checkInDate = sanitizeDate(checkInDate) : null;
        checkOutDate ? data.checkOutDate = sanitizeDate(checkOutDate) : null;

        const booking = await Booking.findByIdAndUpdate(req.params.id, data, { new: true });

        if (checkInDate && checkOutDate) {
            const newBookingDates = createArrayOfDays(data.checkInDate, data.checkOutDate);
            const previousBookingDates = createArrayOfDays(booking.checkInDate, booking.checkOutDate);
            RoomService.resetRoomBookingDatesForGivenDays(booking.room.room_id, previousBookingDates, newBookingDates);
        }
        res.status(200).json({
            message: `Booking updated successfully`
        });
    } catch (err) {
        next(err);
    }
}

async function deleteBooking(req, res, next) {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        const previousBookingDates = createArrayOfDays(booking.checkInDate, booking.checkOutDate);
        await RoomService.resetRoomBookingDatesForGivenDays(booking.room.room_id, previousBookingDates, []);
        res.status(200).json({
            message: `Booking deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}