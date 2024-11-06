// accountRoutes.js
const express = require('express');
const { createAccount, getBalance, addBalance } = require('../controllers/accountController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', auth, createAccount);
router.get('/balance', auth, getBalance);
router.post('/addBalance', auth, addBalance); // New route for adding balance

module.exports = router;
