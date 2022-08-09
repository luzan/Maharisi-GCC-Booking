const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/roles');
const UserService = require('../services/userService');
async function getAllUsers(req, res, next) {
    try {
        const users = await User.find().select({ password: 0 });
        res.status(200).json({
            message: 'All users retrieved successfully',
            data: users
        });
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const currentUser = req.user;
        const userID = req.params.id;
        if (userID !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(userID).select({ password: 0 });
        res.status(200).json({
            message: `User retrieved successfully`,
            data: user
        });
    } catch (err) {
        next(err);
    }
}

// Todo: parse the req.body only allow roles to be added by admin
async function createUser(req, res, next) {
    try {
        const { firstName, middleName, lastName, email, phone, password, gender } = req.body;
        const userData = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            gender: gender
        }
        await UserService.addNewUser(userData).then(user => {
            res.status(201).json({
                message: `User created successfully`,
                data: user
            });
        }).catch(err => {
            throw err;
        });
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const currentUser = req.user;
        const userID = req.params.id;
        if (userID !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findByIdAndUpdate(userID, req.body, { new: true });
        res.status(200).json({
            message: `User updated successfully`,
            data: user
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const currentUser = req.user;
        const userID = req.params.id;
        if (userID !== currentUser.user_id && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findByIdAndDelete(userID);
        res.status(200).json({
            message: `User deleted successfully`,
            data: user
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
                    const token = jwt.sign({ user_id: user._id, firstName: user.firstName, email: user.email, role: user.role }, `${process.env.JWT_SECRET}`, { expiresIn: '6h' });
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