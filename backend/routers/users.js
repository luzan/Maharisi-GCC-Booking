const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');

// api/v1/users
router.get('/', checkToken, getAllUsers);
router.get('/:id', checkToken, getUserById);
router.post('/', checkToken, createUser);
router.put('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);

router.post('/login', login);
module.exports = router;