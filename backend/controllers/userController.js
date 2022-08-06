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
    User.findOne({ email: email }).exec(function (error, user) {
        if (error) {
            next(error);
        } else if (!user) {
            res.status(401).json({ message: `User doesn't exists` });
        } else {
            user.comparePassword(password, function (matchError, isMatch) {
                if (matchError) {
                    res.status(401).json({ message: `Error! Password didn't matched` });
                } else if (!isMatch) {
                    res.status(401).json({ message: `Password didn't matched` });
                } else {
                    const token = jwt.sign({ user_id: user._id, firstName: user.firstName, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: '6h' });
                    res.status(200).json({ token });
                }
            })
        }
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}