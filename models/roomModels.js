const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomModel = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        enum: ['single', 'double', 'deluxe'],
        default: 'single',
    },
    isAccessible: {
        type: Boolean,
        required: true,
        default: false
    },
    maxOccupancy: {
        type: Number,
    },
    building: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    bookingDates: [Number],
    pictureUrls: [{
        type: String,
    }]
})

const Room = mongoose.model('Room', roomModel);
module.exports = Room;