const User = require('../models/userModels');

async function addNewUser(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.create(userData);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    addNewUser
}