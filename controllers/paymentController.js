const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { createPaymentIntent } = require('../utils/paymentGateway'); // Assuming Stripe integration

// Make a payment between accounts
exports.makePayment = async (req, res) => {
    const { accountToId, amount } = req.body;

    try {
        const accountFrom = await Account.findOne({ user: req.user.id });
        const accountTo = await Account.findById(accountToId);

        if (!accountFrom || !accountTo) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        if (accountFrom.balance < amount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        // Process payment with mock or real payment gateway
        const paymentIntent = await createPaymentIntent(amount * 100, 'usd'); // Amount in cents for Stripe
        if (!paymentIntent) {
            return res.status(500).json({ msg: 'Payment processing error' });
        }

        // Update account balances
        accountFrom.balance -= amount;
        accountTo.balance += amount;
        await accountFrom.save();
        await accountTo.save();

        // Record transaction
        const transaction = new Transaction({
            accountFrom: accountFrom._id,
            accountTo: accountTo._id,
            amount,
        });
        await transaction.save();

        res.json({ msg: 'Payment successful', transaction });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
