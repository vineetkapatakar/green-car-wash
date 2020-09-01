const Washer = require('./../models/washerModel');
const catchAsync = require('./../utils/catchAsync');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach( el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
}

exports.getAllWashers = catchAsync(async (req, res, next) => {
    const washers = await Washer.find();
    res.status(200).json({
        status: 'success',
        results: washers.length,
        data: {
            washers
        }
    })
});

exports.washerUpdate = catchAsync( async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password update. Please use /updateMyPassword', 400));

    }
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedWasher = await Washer.findByIdAndUpdate(req.washer.id, filteredBody, 
        {new: true, runValidators: true});
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedWasher
        }
    })
})

exports.getWasher = catchAsync(async (req, res, next) => {
    const washer = await Washer.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            washer
        }
    })
});

exports.createWasher = catchAsync(async (req, res,next) => {
    const newWasher = await Washer.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            washer: newWasher
        }
    })
});

exports.updateWasher = catchAsync(async (req, res, next) => {
    const washer = await Washer.findByIdAndUpdate(req.params.id, req.body,{
        new: true, runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            washer
        }
    });
});

exports.deleteWasher = catchAsync(async (req, res, next) => {
    await Washer.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })

});