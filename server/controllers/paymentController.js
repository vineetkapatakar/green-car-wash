const Payment = require('./../models/paymentModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllPayments = catchAsync( async (req, res, next) => {
    const payments = await Payment.find();
    res.status(200).json({
        status: "success",
        length: payments.length,
        data: {
            payments
        }
    })
});

exports.createPayment = catchAsync( async (req, res, next) => {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            newPayment
        }
    })
})