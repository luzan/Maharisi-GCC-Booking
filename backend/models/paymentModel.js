const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentModel = new Schema({
    payment_id: mongoose.Types.ObjectId,
    room_id: mongoose.Types.ObjectId,
    booking_id: mongoose.Types.ObjectId,
    paymentMethod: { type: String, required: true },    // cash, credit card, debit card, etc.
    paymentDate: { type: Number, default: Date.now() },
    paymentAmount: { type: Number, default: 0 },
    paymentRef: { type: String, default: '' },
}, { timestamps: true });