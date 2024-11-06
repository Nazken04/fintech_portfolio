const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    accountFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    accountTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
