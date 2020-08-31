const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler =  require('./controllers/errorController')
const serviceRouter = require('./routes/servicesRoutes');
const userRouter = require('./routes/userRoutes');
const washerRouter = require('./routes/washersRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes//bookingRoutes');
const paymentRouter = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
// Set security HTTP headers
app.use(helmet());

// Limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
})

app.use('/api', limiter);

// Body pasrser, reading data from req.body
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/washers', washerRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payment', paymentRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;