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
const authorize = require('../middlewares/authorize');
const Role = require('../_helpers/roles');
// api/v1/users
router.post('/login', login);
router.post('/', createUser);
router.get('/', checkToken, authorize(Role.Admin), getAllUsers);
router.get('/:id', checkToken, authorize(), getUserById);
router.put('/:id', checkToken, authorize(), updateUser);
router.delete('/:id', checkToken, authorize(), deleteUser);

module.exports = router;