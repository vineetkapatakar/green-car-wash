const express = require('express');

const washerController = require('../controllers/washerController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.post('/signup', authController.washerSignup);
router.post('/login', authController.washerLogin);

router.post('/forgotPassword', authController.washerForgotPassword);
router.patch('/resetPassword/:token', authController.washerResetPassword);
router.patch('/updateWasherPassword', 
authController.protectWasher, 
authController.updateWasherPassword);
router.patch('/washerUpdate', authController.protectWasher, washerController.washerUpdate);

router
.route('/')
.get(authController.protectWasher, washerController.getAllWashers)
.post(washerController.createWasher);

router
.route('/:id')
.get(washerController.getWasher)
.patch(washerController.updateWasher)
.delete(washerController.deleteWasher);

module.exports = router;