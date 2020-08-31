const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: [true, 'Please enter your card number']
    },
    expireDate: {
        type: String,
        required: [true, 'Please enter expire date']
    },
    cvvNumber: {
        type: Number,
        required: [true, 'Please enter CVV number']
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