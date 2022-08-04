const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json({
            users: users
        });
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            user: user
        });
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            user: user
        });
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: `User updated successfully`
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `User deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;
    // compare the hashed password with the password that the user entered
    const userDB = await User.findOne({ email });
    if (userDB.password === password) {
        //sign the token
        const token = jwt.sign({ user_id: userDB._id, firstName: userDB.firstName, email: userDB.email }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}