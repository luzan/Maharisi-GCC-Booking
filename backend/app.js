const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

mongoose.connect(`mongodb+srv://miuBooking:${process.env.MONGO_PWD}@cluster0.ujquu0n.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true });

app.use(express.json());

app.use('/api/v1/users', require('./routers/users'));
app.use('/api/v1/rooms', require('./routers/rooms'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: err.message
    });
})
app.listen(3000, () => { console.log(`Listening on 3000`); })
