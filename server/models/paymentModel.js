const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: [true, 'Please enter your card number'],
        min: 12,
        max: 12
    },
    expireDate: {
        type: String,
        required: [true, 'Please enter expire date']
    },
    cvvNumber: {
        type: Number,
        required: [true, 'Please enter CVV number'],
        min: 3,
        max: 3
    },
    nameOnCard: {
        type: String,
        required: [true, 'Please enter the name']
    },
    amount: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;