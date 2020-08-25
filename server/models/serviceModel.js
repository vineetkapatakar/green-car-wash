const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: [true, 'A service must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'A service must have duration']
    },
    price: {
        type: Number,
        required: [true, 'A service must have a price']
    },
    priceDiscount: Number,
    description: {
        type: String,
        required: [true, 'A service must have description']
    }
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;