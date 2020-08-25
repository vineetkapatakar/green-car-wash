const express = require('express');

const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/carwashBooking', authController.protect, authController.carwashBooking);

router
.route('/')
.get(bookingController.getAllBookings)
.post(authController.protect, bookingController.createBooking);

router
.route('/:id')
.get(bookingController.getBooking)
.patch(bookingController.updateBooking)
.delete(bookingController.deleteBooking);

module.exports = router;