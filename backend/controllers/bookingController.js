const Booking = require('../models/bookingModel');
const RoomService = require('../services/roomService');
const { createArrayOfDays, sanitizeDate } = require('../utils/dateUtils');
const Utils = require('../utils/tools');
const Role = require('../_helpers/roles');
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
        const currentUser = req.user;
        const booking = await Booking.findById(req.params.id);
        if (booking.user.user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            booking: booking
        });
    } catch (err) {
        next(err);
    }
}

async function createBooking(req, res, next) {
    try {
        const currentUser = req.user;
        const {
            roomId, roomType, userId, firstName, lastName, email, phoneNumber,
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime,
            purposeOfStay, bookingFor
        } = req.body;
        if (userId !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let daysToBook = createArrayOfDays(checkInDate, checkOutDate);
        let roomAvailable;
        // Todo: move it to admin controller and also add discount logic
        // if (roomId) {
        //     roomAvailable = await RoomService.checkRoomAvailabilityForBooking(roomId, daysToBook);
        // roomAvailable = roomAvailable[0];
        // } else {
        //     throw new Error(`Room ID is required`);
        // }
        let query = {};
        accessibleRequired == true ? query.isAccessible = true : null;
        if (roomType) {
            query.bookingDates = { $nin: daysToBook };
            roomAvailable = await RoomService.getRoomsByRoomType(roomType, query, { $limit: 1 });
        }
        if (roomAvailable && roomAvailable.length > 0) {
            (roomAvailable.length > 0) ? roomAvailable = roomAvailable[0] : null;
            const totalPrice = roomAvailable.pricePerNight * daysToBook.length;
            const booking = {
                room: {
                    room_id: roomAvailable._id,
                    roomNumber: roomAvailable.roomNumber,
                },
                user: {
                    user_id: userId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber
                },
                numberOfGuests: numberOfGuests,
                accessibleRequired: accessibleRequired,
                checkInDate: sanitizeDate(checkInDate),
                checkOutDate: sanitizeDate(checkOutDate),
                arrivalTime: arrivalTime ? arrivalTime : null,
                departureTime: departureTime ? departureTime : null,
                bookingFor: bookingFor,
                purposeOfStay: purposeOfStay,
                cost: {
                    regularPrice: totalPrice,
                    totalPrice: totalPrice,
                }
            }
            const bookingResponse = await Booking.create(booking);

            res.status(201).json({
                message: `Booking created successfully`, booking: bookingResponse
            });
        } else {
            res.status(400).json({
                message: `Room is already booked for that period`
            });
        }
    } catch (err) {
        next(err);
    }
}

async function updateBooking(req, res, next) {
    try {
        const currentUser = req.user;
        const { booking_id, user_id } = req.params;

        if (user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

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
        data.status = "revised";

        const booking = await Booking.findByIdAndUpdate(booking_id, data, { new: true });

        // if (checkInDate && checkOutDate) {
        //     const newBookingDates = createArrayOfDays(data.checkInDate, data.checkOutDate);
        //     const previousBookingDates = createArrayOfDays(booking.checkInDate, booking.checkOutDate);
        //     RoomService.resetRoomBookingDatesForGivenDays(booking.room.room_id, previousBookingDates, newBookingDates);
        // }
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