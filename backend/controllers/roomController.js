const Room = require('../models/roomModels');
const { createArrayOfDays } = require('../utils/dateUtils');
// api/v1/rooms/?available=true&accessible=true&building=B&floor=1&checkInDate=1659589200000&checkOutDate=1659589200000
async function getAllRooms(req, res, next) {
    try {
        const { accessible, available, building, floor, checkInDate, checkOutDate } = req.query;

        let filter = {};
        if (accessible) {
            filter.isAccessible = accessible == "true" ? true : false;
        }
        if (building) {
            filter.building = building;
        }
        if (floor) {
            filter.floor = parseInt(floor);
        }
        if (available) {
            let daysToSearch = createArrayOfDays(parseInt(checkInDate), parseInt(checkOutDate));
            filter.bookingDates = { $nin: daysToSearch };
        }

        const rooms = await Room.aggregate([{
            $match: filter
        }]);
        res.status(200).json({
            rooms: rooms
        });
    } catch (err) {
        next(err);
    }
}

async function getRoomById(req, res, next) {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json({
            room: room
        });
    } catch (err) {
        next(err);
    }
}

async function createRoom(req, res, next) {
    try {
        const room = await Room.create(req.body);
        res.status(201).json({
            room: room
        });
    } catch (err) {
        next(err);
    }
}

async function updateRoom(req, res, next) {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: `Room updated successfully`
        });
    } catch (err) {
        next(err);
    }
}

async function deleteRoom(req, res, next) {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `Room deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
}