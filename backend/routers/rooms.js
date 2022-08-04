const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const checkToken = require('../middlewares/checkToken');
// api/v1/rooms
router.get('/', checkToken, getAllRooms);
router.get('/:id', checkToken, getRoomById);
router.post('/', checkToken, createRoom);
router.put('/:id', checkToken, updateRoom);
router.delete('/:id', checkToken, deleteRoom);

module.exports = router