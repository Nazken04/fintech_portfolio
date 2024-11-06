const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amount, currency) {
    return await stripe.paymentIntents.create({
        amount,
        currency,
    });
}

module.exports = { createPaymentIntent };
