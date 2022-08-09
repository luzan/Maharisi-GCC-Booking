const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API, please use /api/v1/users, /api/v1/rooms, /api/v1/bookings, /api/v1/payments, /api/v1/dashboard');
});

module.exports = router;