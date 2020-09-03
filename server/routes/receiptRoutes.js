const express = require('express');
const receiptController = require('../controllers/receiptController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/receiptGenerator', authController.generateReceipt);

router.route('/')
.get(receiptController.getAllReceipts);

module.exports = router;