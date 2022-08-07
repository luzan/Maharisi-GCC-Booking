const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = require('../models/bookingModel');
const paymentModel = new Schema({
    booking_id: mongoose.Types.ObjectId,
    user: {
        user_id: mongoose.Types.ObjectId,
        firstName: String,
        lastName: String,
        email: String,
    },
    paymentMethod: { type: String, required: true },    // cash, credit card, debit card, etc.
    paymentDate: { type: Number, default: Date.now() },
    amount: { type: Number, required: true },
    discountType: { type: String, default: null },
    discount: { type: Number, default: 0 },
    paymentAmount: { type: Number, default: 0 },
    paymentRef: { type: String, default: '' },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'partial', 'refunded', 'overdue', 'needs_attention'],
        default: 'pending'
    }
}, { timestamps: true });

paymentModel.post('save', async function (doc, next) {
    await Booking.findByIdAndUpdate({ _id: doc.booking_id }, { paymentStatus: doc.status }, { upsert: true });
    next();
})

const Payment = mongoose.model('Payment', paymentModel);
module.exports = Payment;