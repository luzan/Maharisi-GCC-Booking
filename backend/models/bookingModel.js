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
    checkInDate: { type: Number, required: true, default: Date.now() },
    checkOutDate: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

});