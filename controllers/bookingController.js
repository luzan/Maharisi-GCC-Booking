const Booking = require('../models/bookingModel');
const RoomService = require('../services/roomService');
const { createArrayOfDays, sanitizeDate } = require('../utils/dateUtils');
const Utils = require('../utils/tools');
const Role = require('../_helpers/roles');
const mongoose = require('mongoose');

async function getAllBookings(req, res, next) {
    try {
        const { template, limit } = req.query;
        let bookings;
        let query = {}

        if (template === 'dashboard') {
            query.checkInDate = { $gte: new Date() };
            bookings = await Booking.find(query).sort({ checkInDate: 1 }).limit(6).select({
                room: 1, checkInDate: 1, user: 1,
            });
            return res.status(200).json({
                success: true,
                data: bookings
            });
        }

        if (limit)
            bookings = await Booking.find().sort({ checkInDate: -1 }).limit(parseInt(limit));
        else
            bookings = await Booking.find().sort({ checkInDate: -1 });
        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        next(err);
    }
}

async function getBookingById(req, res, next) {
    try {
        const currentUser = req.user;
        const booking = await Booking.findById(req.params.id);
        let bookingUserId;
        (booking.user.user_id) ? bookingUserId = booking.user.user_id.toString() : null;
        if (bookingUserId !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (err) {
        next(err);
    }
}

async function getBookingsByUserId(req, res, next) {
    try {
        const currentUser = req.user;
        const { user_id } = req.params;
        if (user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const booking = await Booking.find({ 'user.user_id': mongoose.Types.ObjectId(user_id) });
        res.status(200).json({
            success: true,
            data: booking
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
                success: true,
                message: `Booking created successfully`,
                data: bookingResponse
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Room is already booked for that period`
            });
        }
    } catch (err) {
        next(err);
    }
}

async function createBookingByAdmin(req, res, next) {
    try {
        const {
            roomId, roomType, roomNumber, firstName, lastName, email, phoneNumber,
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime,
            purposeOfStay, bookingFor, discountType, discountOf, pricePerNight
        } = req.body;

        let daysToBook = createArrayOfDays(checkInDate, checkOutDate);
        let totalAmount = parseInt(pricePerNight) * daysToBook.length;
        let discountedAmount = Utils.applyDiscount(totalAmount, discountType, parseInt(discountOf));

        const booking = {
            room: {
                room_id: roomId,
                roomNumber: roomNumber,
                roomType: roomType
            },
            user: {
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
                regularPrice: totalAmount,
                discountType: discountType,
                discountOf: parseInt(discountOf),
                totalPrice: discountedAmount,
            }
        }
        const bookingResponse = await Booking.create(booking);

        res.status(201).json({
            message: `Booking created successfully`, data: bookingResponse
        });

    } catch (err) {
        next(err);
    }
}

async function updateBooking(req, res, next) {
    try {
        const currentUser = req.user;
        const { booking_id, user_id } = req.params;
        const {
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime,
            purposeOfStay, phoneNumber, email, roomType, occupants
        } = req.body;
        if (user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        let daysToBook = createArrayOfDays(checkInDate, checkOutDate);
        let roomAvailable;

        let query = {};
        accessibleRequired == true ? query.isAccessible = true : null;
        if (roomType) {
            query.bookingDates = { $nin: daysToBook };
            roomAvailable = await RoomService.getRoomsByRoomType(roomType, query, { $limit: 1 });
        }

        if (roomAvailable && roomAvailable.length > 0) {
            (roomAvailable.length > 0) ? roomAvailable = roomAvailable[0] : null;
            const totalPrice = roomAvailable.pricePerNight * daysToBook.length;

            let data = {};
            data.room = {
                room_id: roomAvailable._id,
                roomNumber: roomAvailable.roomNumber,
                building: roomAvailable.building
            }
            occupants ? data.numberOfGuests = occupants : null;
            accessibleRequired ? data.accessibleRequired = accessibleRequired : null;
            arrivalTime ? data.arrivalTime = arrivalTime : null;
            departureTime ? data.departureTime = departureTime : null;
            checkInDate ? data.checkInDate = sanitizeDate(checkInDate) : null;
            checkOutDate ? data.checkOutDate = sanitizeDate(checkOutDate) : null;
            purposeOfStay ? data.purposeOfStay = purposeOfStay : null;
            numberOfGuests ? data.numberOfGuests = numberOfGuests : null;
            data.bookingStatus = "revised";
            data.cost = {
                regularPrice: totalPrice,
                totalPrice: totalPrice,
            }
            data.user = {
                user_id: user_id ? user_id : null,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                phoneNumber: phoneNumber,
                email: email
            }

            const booking = await Booking.findByIdAndUpdate(booking_id, data);
            res.status(200).json({
                message: `Booking updated successfully`
            });
        } else {
            res.status(400).json({
                success: false,
                message: `No rooms are available for that period`
            });
        }
    } catch (err) {
        next(err);
    }
}

async function updateBookingByAdmin(req, res, next) {
    try {
        console.log('---iam in update booking by admin---');
        const { booking_id } = req.params;
        const {
            roomId, roomType, roomNumber, building, firstName, lastName, email, phoneNumber,
            numberOfGuests, accessibleRequired,
            checkInDate, checkOutDate, arrivalTime, departureTime,
            purposeOfStay, bookingFor, discountType, discountOf, pricePerNight
        } = req.body;
        console.log(req.body);
        let daysToBook = createArrayOfDays(checkInDate, checkOutDate);
        let totalAmount = parseInt(pricePerNight) * daysToBook.length;
        let discountedAmount = Utils.applyDiscount(totalAmount, discountType, parseInt(discountOf));

        const bookingData = {
            room: {
                room_id: roomId,
                roomNumber: roomNumber,
                building: building,
            },
            user: {
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
            bookingStatus: "revised",
            cost: {
                regularPrice: totalAmount,
                discountType: discountType,
                discountOf: parseInt(discountOf),
                totalPrice: discountedAmount,
            }
        }
        console.log('---booking data---', bookingData);
        const bookingResponse = await Booking.findByIdAndUpdate(booking_id, bookingData);

        res.status(201).json({
            message: `Booking updated successfully`, data: bookingResponse
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

async function cancelBooking(req, res, next) {
    try {

        const booking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus: "cancelled" });
        res.status(200).json({
            message: `Booking cancelled successfully`
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllBookings,
    getBookingById,
    getBookingsByUserId,
    createBooking,
    createBookingByAdmin,
    updateBooking,
    updateBookingByAdmin,
    deleteBooking,
}