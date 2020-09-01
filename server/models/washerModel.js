const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const washerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A washer must have a name'],
        trim: true
    },
    email: {
        type: String,
        required:[true, 'A washer must have a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    contactNumber: {
        type: Number,
        required:[true, 'A washer must have a contact number']
    },
    role: {
        type: String,
        enum: ['washer', 'manager', 'admin'],
        default: 'washer'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords are not same!'
        }
    },
    washerId: Number,
    experience: Number,
    active: {
        type: Boolean,
        default: false
    },
    orders: {
        type: [Object]
    },
    ratingsAverage: Number,
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    reviews:[Object],
    profilePicture: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

})

washerSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

washerSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

washerSchema.methods.correctPassword = async function(candidatePassword, washerPassword) {
    return await bcrypt.compare(candidatePassword, washerPassword);
}

washerSchema.methods.passwordChanged = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
    }
    return false;
}

washerSchema.methods.washerPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
const Washer = mongoose.model('Washer', washerSchema);

module.exports = Washer;