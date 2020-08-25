const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review is missing'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is missing']
    },
    userId: {
        type: String,
        required: [true, 'User id is missing']
    },
    washerId: {
        type: String,
        required: [true, 'Washer id is missing']
    },
    serviceName: {
        type: String,
        required: [true, 'Service name is missing']
    },
    reviewedAt: {
        type: Date,
        default: Date.now(),
        select: false 
      }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports =  Review;