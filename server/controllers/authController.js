const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Washer = require('./../models/washerModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    // Remove password from the output
    user.password= undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    createSendToken(newUser, 201, res)
});

exports.logIn = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new AppError('You are not logged in! Please login to get access..', 401))
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401))
    }

    // 4)Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please login again.', 401))
    }

    req.user = currentUser;
    next();
})

exports.forgotPassword = catchAsync( async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new AppError('There is no user with this email address', 404))
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a patch request with your new password and 
    passwordConfirm to: ${resetURL}. \n If you didn't forget your password,
    please ignore this email`;

    try{
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 mins)',
            message
        })
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    } catch(err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});

        return next(new AppError('There was an error while sending the email. Try again later.', 500))
    }

});

exports.resetPassword = catchAsync( async (req, res, next) => {
    // 1) Get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: 
    Date.now() }});

    // 2) If token has not expired and there is a user, set the new password
    if(!user) {
        return next(new AppError('Token is invalid or has expired.', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update the changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed password is correct
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong!', 401));
    }
    // 3) If so, then update the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});

exports.carwashBooking  = catchAsync( async (req, res, next) => {
    const message = `Hi ${req.user.name}, Your Car wash booking is confirmed. -Green Car Wash`
    try{
        const newBooking = await Booking.create({
            serviceName:  req.body.serviceName,
            carNumber: req.body.carNumber,
            carBrand: req.body.carBrand,
            carModel: req.body.carModel,
            address: req.body.address,
            location: req.body.location
        })
        await sendEmail({
            email: req.user.email,
            subject: 'Car wash booking confirmation',
            message
        })
    
        res.status(201).json({
            status: 'success',
            message: 'Email sent'
        })
    } catch(err) {
        return next(new AppError('There was an error while sending the email. Try again later.', 500))
    }
});

exports.washerSignup = catchAsync( async (req, res, next) => {
    const newWasher = await Washer.create({
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newWasher, 201, res);
})

exports.washerLogin = catchAsync( async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide Email and Password', 400))
    }
    const washer = await Washer.findOne({ email }).select('+password');

    if(!washer || !(await washer.correctPassword(password, washer.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(washer, 200, res);
})

exports.protectWasher = catchAsync( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new AppError('You are not logged in. Please login to get access.'))
    }
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentWasher = await Washer.findById(decoded.id);
    if(!currentWasher) {
        return next(new AppError('The washer belonging to this token does no longer exist.', 401))
    }

    if(currentWasher.passwordChanged(decoded.iat)) {
        return next(new AppError('Washer recently changed password! Please login again.', 401))
    }

    req.washer = currentWasher;
    next()
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'manager'] role='washer'
        if(!roles.includes(req.washer.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

exports.washerForgotPassword = catchAsync( async (req, res, next) => {
    const washer = await Washer.findOne({ email: req.body.email});

    if(!washer) {
        return next(new AppError('There is no washer with this email address.', 404));
    }
    console.log('Washer', washer);
    const resetToken = washer.washerPasswordResetToken();
    await washer.save({validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/washers/resetPassword/
    ${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password
    and passwordConfirm to: ${resetURL}.\n If you did not forget your password, please ignore 
    this email`;
    try {
        await sendEmail({
            email: washer.email,
            subject: 'your password reset token (valid for 10 mins)',
            message
        })
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })

    } catch(err) {
        washer.passwordResetToken = undefined;
        washer.passwordResetExpires = undefined;
        await washer.save({validateBeforeSave: false});

        return next(new AppError('There was an error while sending email!', 500))
    }

});

exports.washerResetPassword = catchAsync( async (req, res, next) => {
    const hashedToken = crypto
    .createHash('sha256').update(req.params.token).digest('hex');

    const washer = await Washer.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })
    if(!washer) {
        return next(new AppError('Token is invalid or has expired', 400))
    }
    washer.password = req.body.password;
    washer.passwordConfirm = req.body.passwordConfirm;
    washer.passwordResetToken = undefined;
    washer.passwordResetExpires = undefined;
    await washer.save();

    createSendToken(washer, 200, res);
});

exports.updateWasherPassword = catchAsync( async (req, res, next) => {
    const washer = await Washer.findById(req.washer.id).select('+password');

    if(!(await washer.correctPassword(req.body.passwordCurrent, washer.password))) {
        return next(new AppError('Your current password is wrong', 401))
    }
    washer.password = req.body.password;
    washer.passwordConfirm = req.body.passwordConfirm;
    await washer.save();

    createSendToken(washer, 200, res);
})