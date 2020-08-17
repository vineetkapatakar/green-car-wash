const Service = require('./../models/serviceModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllServices = catchAsync(async (req, res, next) => {
    const services = await Service.find();
    res.status(200).json({
        status: 'success',
        results: services.length,
        data: {
            services
        }
    })
});

exports.getService = catchAsync(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            service
        }
    })
});

exports.createService = catchAsync(async (req, res, next) => {
    const newService = await Service.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            service: newService
        }
    })
});

exports.updateService = catchAsync(async (req, res, next) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body,{
        new: true, runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            service
        }
    });
});

exports.deleteService = catchAsync(async (req, res, next) => {
    await Service.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
});