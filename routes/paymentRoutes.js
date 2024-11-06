const express = require('express');
const { makePayment } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pay', auth, makePayment);

module.exports = router;
