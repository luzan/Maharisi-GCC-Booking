const Payment = require('../models/paymentModel');
const BookingService = require('../services/bookingService');
const Role = require('../_helpers/roles');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
async function getAllPayments(req, res, next) {
    try {
        const payments = await Payment.find().sort({ paymentDate: -1 });
        console.log(payments);
        res.status(200).json({
            message: 'All payments retrieved successfully',
            data: payments
        });
    } catch (err) {
        next(err);
    }
}

async function getPaymentById(req, res, next) {
    try {
        const currentUser = req.user;
        const payment = await Payment.findById(req.params.id);
        // only allow admins to access other user records
        if (payment.user.user_id.toString() !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            message: 'Payment retrieved successfully',
            data: payment
        });
    } catch (err) {
        next(err);
    }
}

async function getAllPaymentByUserId(req, res, next) {
    try {
        const currentUser = req.user;
        const { user_id } = req.params;

        const payment = await Payment.find({ 'user.user_id': ObjectId(user_id) });
        // only allow admins to access other user records
        if (user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            message: 'Payment retrieved successfully',
            data: payment
        });
    } catch (err) {
        next(err);
    }
}

async function createPaymentForBooking(req, res, next) {
    try {
        const { booking_id } = req.params;
        const currentUser = req.user;
        const { user_id, firstName, lastName, email, address, country, state, zipCode,
            paymentMethod, paymentAmount, paymentRef
        } = req.body;
        const bookingCostInfo = await BookingService.getCostInformationFromBooking(booking_id);
        console.log(user_id, currentUser.user_id);
        // only allow admins to access other user records
        if (user_id !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!bookingCostInfo) {
            res.status(401).json({
                message: `Invalid booking id: ${booking_id}`
            });
        } else {
            let totalAmountToPay = bookingCostInfo.totalPrice;
            let status = (paymentAmount < totalAmountToPay) ? 'partial' : (paymentAmount === totalAmountToPay) ? 'paid' : 'needs_attention'

            const payment = await Payment.create({
                user: {
                    user_id: user_id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: address,
                    country: country,
                    state: state,
                    zipCode: zipCode,
                },
                booking_id: booking_id,
                paymentMethod: paymentMethod,
                amount: bookingCostInfo.totalPrice,
                paymentAmount: paymentAmount,
                paymentRef: paymentRef,
                status: status
            });
            res.status(200).json({
                message: 'Payment created successfully',
                data: payment
            });
        }

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    getAllPaymentByUserId,
    createPaymentForBooking,
}