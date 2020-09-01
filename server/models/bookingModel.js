const mongoose = require('mongoose');

const bookingSchema= new mongoose.Schema({
    serviceName: {
        type: String,
        required: [true, 'A carwash booking should have a name']
    },
    carNumber: {
        type: String,
        required: [true, 'Car number is required']
    },
    carModel: {
        type: String,
        required: [true, 'Car model is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    time: {
      type: Date,
      required: [true, 'Time is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    location: {
        type: [Number],
        required: [true, 'location is required']
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;