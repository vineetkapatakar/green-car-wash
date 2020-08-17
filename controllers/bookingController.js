const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBookings = catchAsync( async (req, res, next) => {
    const bookings = await Booking.find();
    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings
        }
    })
})

exports.getBooking = catchAsync( async (req, res, next) => {
   const booking = await Booking.findById(req.params.id);
   res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    })
})

exports.createBooking = catchAsync( async (req, res, next) => {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newBooking
        }
    })
})

exports.updateBooking = catchAsync( async (req, res, next) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            booking
         }
    });
})

exports.deleteBooking = catchAsync( async (req, res, next) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
})