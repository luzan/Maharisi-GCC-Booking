const Room = require('../models/roomModels');

// api/v1/rooms/?available=true&accessible=true&building=B&floor=1
async function getAllRooms(req, res, next) {
    try {
        const { accessible, available, building, floor } = req.query;
        let query = {};
        if (accessible) {
            query.isAccessible = accessible;
        }
        // if (available) {
        //     query.available = available;
        // }
        if (building) {
            query.building = building;
        }
        if (floor) {
            query.floor = floor;
        }
        console.log(query);
        const rooms = await Room.find(query);
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