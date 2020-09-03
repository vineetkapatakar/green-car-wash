const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    receiptNum: {
        type:Number,
        required: [true, 'Please enter service number'],
        unique: true
    },
    services: {
        type: [String],
        required: [true, 'Please enter service name']
    },
    washerId: {
        type: String,
        required: [true, 'Please enter washer id']
    },
    amount: {
        type: Number,
        required: [true, 'Please enter total amount']
    },
    userName: {
        type: String,
        required: [true, 'Please enter user name']
    },
    contactNumber: {
        type: Number,
        required: [true, 'Please enter user contact number']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    image: { 
        type: String,
        required: [true, 'Car image required']
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;