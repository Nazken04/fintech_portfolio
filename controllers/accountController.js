const Account = require('../models/Account');
const User = require('../models/User');

// Create account for user
exports.createAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let account = await Account.findOne({ user: req.user.id });
        if (account) {
            return res.status(400).json({ msg: 'Account already exists' });
        }

        account = new Account({ user: req.user.id, balance: 0 });
        await account.save();
        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add balance to the user's account
exports.addBalance = async (req, res) => {
    const { amount } = req.body;

    try {
        // Find the user's account
        const account = await Account.findOne({ user: req.user.id });
        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        // Ensure the amount is a positive number
        if (amount <= 0) {
            return res.status(400).json({ msg: 'Amount must be greater than zero' });
        }

        // Update the account balance
        account.balance += amount;
        await account.save();

        res.json({ msg: 'Balance added successfully', balance: account.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get account balance
exports.getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({ user: req.user.id });
        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        res.json({ balance: account.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
