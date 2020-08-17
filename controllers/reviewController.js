const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();
     res.status(200).json({
        status: 'success',
        esults: reviews.length,
        data: {
            reviews
        }
    })
});

exports.getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    })
});

exports.createReview = catchAsync(async (req, res, next) => {
     const newReview = await Review.create(req.body);
     res.status(201).json({
        status: 'success',
        data: {
             review: newReview
        }
    }) 
});

exports.updateReview = catchAsync(async (req, res, next) => {
   const review = await Review.findByIdAndUpdate(req.params.id, req.body,{
        new: true, runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
});