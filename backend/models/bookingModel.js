const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    numberOfGuests: Number,
    accessibleRequired: Boolean,
    checkInDate: { type: Number, required: true, default: Date.now() },
    checkOutDate: { type: Number, required: true },
    arrivalTime: { type: Number },
    departureTime: { type: Number },
    cost: {
        regularPrice: { type: Number, required: true },
        discountType: { type: String },
        discount: { type: Number, default: 0 },
        totalPrice: { type: Number, required: true },
    },
    paymentStatus: { type: String, default: 'pending' },
    // bookingStatus: { type: String, required: true, default: 'pending' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingModel);
module.exports = Booking;