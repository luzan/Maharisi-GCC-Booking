const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const checkToken = require('../middlewares/checkToken');
const authorize = require('../middlewares/authorize');
const Role = require('../_helpers/roles');
const upload = require("../middlewares/upload");

// api/v1/rooms
router.get('/', checkToken, authorize(), getAllRooms);
router.get('/:id', checkToken, authorize(), getRoomById);
router.get('/types/:room_type', checkToken, authorize(), getRoomById);
router.post('/', checkToken, authorize(Role.Admin), upload.single("image"), createRoom);
router.put('/:id', checkToken, authorize(Role.Admin), updateRoom);
router.delete('/:id', checkToken, authorize(Role.Admin), deleteRoom);

module.exports = router