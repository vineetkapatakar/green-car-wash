const express = require('express');

const serviceController = require('../controllers/serviceController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
.route('/')
.get(authController.protectWasher, serviceController.getAllServices)
.post(serviceController.createService);

router
.route('/:id')
.get(serviceController.getService)
.patch(serviceController.updateService)
.delete(
    authController.protectWasher, 
    authController.restrictTo('admin', 'manager'), 
    serviceController.deleteService);

module.exports = router;