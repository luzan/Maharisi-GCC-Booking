const Room = require('../models/roomModels');
const { uploadFile } = require("../middlewares/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
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
        let projectBy = (template) ? template : "";
        switch (projectBy) {
            case "summary":
                project = { _id: 1, roomType: 1, building: 1, floor: 1, roomNumber: 1, isAccessible: 1, pricePerNight: 1, maxOccupancy: 1 };
                break;
            default:
                project = { _id: 1, roomType: 1, building: 1, floor: 1, roomNumber: 1, isAccessible: 1, pricePerNight: 1, pictureUrl: 1, bookingDates: 1 };
        }


        if (available) {
            let daysToSearch = createArrayOfDays(parseInt(checkInDate), parseInt(checkOutDate));
            filter.bookingDates = { $nin: daysToSearch };
        }

        await Room.aggregate().match(filter).project(project).exec((err, rooms) => {
            res.status(200).json({
                message: `Rooms found successfully`,
                docs: rooms.length,
                data: rooms
            });
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
        const { roomNumber, building, floor, isAccessible, maxOccupancy, roomType, pricePerNight, pictureUrl } = req.body;

        await uploadFile(req.file).then(async (result) => {
            const room = await Room.create({
                building: building,
                roomNumber: roomNumber,
                floor: floor,
                isAccessible: (isAccessible) ? true : false,
                roomType: roomType,
                pricePerNight: pricePerNight,
                maxOccupancy: maxOccupancy,
                pictureUrls: [result.Location]
            });
            // Deleting from local if uploaded in S3 bucket
            await unlinkFile(req.file.path);
            res.status(201).json({
                message: `Room created successfully`,
                data: room
            });
        }).catch(err => {
            console.log(err);
            res.status(201).json({
                message: `Problem uploading file`,
                error: true
            });
        });
    } catch (err) {
        next(err);
    }
}

async function getRoomSummary(req, res, next) {
    try {
        const room = await Room.find().distinct('roomType');
        //const image = room.pictureUrls.find(image => image.key === req.params.image_key);
        res.status(200).json({
            message: `Room image found successfully`,
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
    deleteRoom,
    getRoomSummary
}