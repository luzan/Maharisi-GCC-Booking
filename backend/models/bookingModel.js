const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomService = require('../services/roomService');
const { createArrayOfDays } = require('../utils/dateUtils');

const bookingModel = new Schema({
    room: {
        room_id: mongoose.Types.ObjectId,
        roomNumber: Number,
    },
    user: {
        user_id: mongoose.Types.ObjectId,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
    },
    numberOfGuests: Number,
    bookingFor: {
        type: String,
        enum: ['student', 'staff', 'faculty', 'other'],
        default: 'other'
    },
    accessibleRequired: Boolean,
    checkInDate: { type: Number, required: true, default: Date.now() },
    checkOutDate: { type: Number, required: true },
    arrivalTime: { type: Number },
    departureTime: { type: Number },
    cost: {
        regularPrice: { type: Number, required: true },
        discountType: { type: String, default: null },
        discount: { type: Number, default: 0 },
        totalPrice: { type: Number, required: true },
    },
    paymentStatus: { type: String, default: 'pending' },
    purposeOfStay: { type: String },
    bookingStatus: {
        type: String,
        enum: ['started', 'revised', 'completed', 'cancelled'],
        default: 'started'
    },
}, { timestamps: true });

let oldCheckInDate;
let oldCheckoutDate;
bookingModel.pre('save', async function (next) {
    if (this.bookingStatus === 'revised' || this.bookingStatus === 'cancelled') {
        oldCheckInDate = this.checkInDate;
        oldCheckoutDate = this.checkOutDate;
    }
    next();
})

bookingModel.post('save', async function (doc, next) {
    let daysToBook = createArrayOfDays(doc.checkInDate, doc.checkOutDate);
    if (doc.bookingStatus === 'started') {
        await RoomService.addBookingDates(doc.room.room_id, daysToBook);
    } else if (doc.bookingStatus === 'completed') {
        await RoomService.resetRoomBookingDatesForGivenDays(doc.room.room_id, daysToBook);
    } else if (doc.bookingStatus === 'revised') {
        let previousBookingDates = createArrayOfDays(oldCheckInDate, oldCheckoutDate);
        await RoomService.resetRoomBookingDatesForGivenDays(doc.room.room_id, previousBookingDates, daysToBook);
    } else if (doc.bookingStatus === 'cancelled') {
        let previousBookingDates = createArrayOfDays(oldCheckInDate, oldCheckoutDate);
        await RoomService.resetRoomBookingDatesForGivenDays(doc.room.room_id, previousBookingDates);
    }
    next();
})

const Booking = mongoose.model('Booking', bookingModel);
module.exports = Booking;