const Receipt = require('./../models/receiptModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllReceipts = catchAsync( async (req, res, next) => {
    const receipts = await Receipt.find();
    res.status(200).json({
        status: "success",
        length: receipts.length,
        data: {
            receipts
        }
    })
});
