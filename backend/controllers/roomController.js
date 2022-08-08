const Room = require('../models/roomModels');
const { createArrayOfDays } = require('../utils/dateUtils');
// api/v1/rooms/?available=true&accessible=true&building=B&floor=1&checkInDate=1659589200000&checkOutDate=1659589200000
async function getAllRooms(req, res, next) {
    try {
        const { template, accessible, available, building, floor, checkInDate, checkOutDate, roomType } = req.query;
        let project = {}, filter = {};

        if (accessible) {
            filter.isAccessible = accessible == "true" ? true : false;
        }
        if (building) {
            filter.building = building;
        }
        if (floor) {
            filter.floor = parseInt(floor);
        }
        if (roomType) {
            filter.roomType = roomType;
        }
        if (template) {
            switch (template) {
                case "all":
                    project = { _id: 1, roomType: 1, building: 1, floor: 1, roomNumber: 1, isAccessible: 1, roomPrice: 1, roomDescription: 1, roomImage: 1 }
                    break;
                case "summary":
                    project = { pictureUrl: 0 }
            }
        }

        if (available) {
            let daysToSearch = createArrayOfDays(parseInt(checkInDate), parseInt(checkOutDate));
            filter.bookingDates = { $nin: daysToSearch };
        }

        const rooms = await Room.aggregate([{
            $match: filter,
            $project: project
        }]);

        res.status(200).json({
            message: `Rooms found successfully`,
            data: rooms
        });
    } catch (err) {
        next(err);
    }
}

async function getRoomById(req, res, next) {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json({
            message: `Room found successfully`,
            data: room
        });
    } catch (err) {
        next(err);
    }
}

async function createRoom(req, res, next) {
    try {
        const { roomNumber, building, floor, isAccessible, roomType, pricePerNight, pictureUrl } = req.body;
        const room = await Room.create({
            building: building,
            roomNumber: roomNumber,
            floor: floor,
            isAccessible: isAccessible,
            roomType: roomType,
            pricePerNight: pricePerNight,

        });
        res.status(201).json({
            message: `Room created successfully`,
            data: room
        });
    } catch (err) {
        next(err);
    }
}

async function updateRoom(req, res, next) {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: `Room updated successfully`,
            data: room
        });
    } catch (err) {
        next(err);
    }
}

async function deleteRoom(req, res, next) {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `Room deleted successfully`,
            data: room
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