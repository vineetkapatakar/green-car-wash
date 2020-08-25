const mongoose = require('mongoose');

const bookingSchema= new mongoose.Schema({
    serviceName: {
        type: String,
        required: [true, 'A carwash booking should have a name']
    },
    carNumber: {
        type: String,
        required: [true, 'Car number is required for booking car wash']
    },
    carBrand: {
        type: String,
        required: [true, 'Car brand is required for booking car wash']
    },
    carModel: {
        type: String,
        required: [true, 'Car model is required for booking car wash']
    },
    address: {
        type: String,
        required: [true, 'Address is required for booking car wash']
    },
    location: {
        type: [Number],
        required: [true, 'location is required for booking car wash']
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;