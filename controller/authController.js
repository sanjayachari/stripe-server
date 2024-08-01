const stripe = require('stripe')('sk_test_51PiwzFDao70MZ3nrEdoit4vLz6UmkRlPCyO2LLGK4KzKzE1HZgkDi5T54qrLy96PAlwpzUgaCRnrTFUn7I4ep3KP00CRrNyCVR');
const YOUR_DOMAIN = 'http://localhost:5050';

const test = async (req, res) => {
    res.json('test works')
};

const checkout = async (req, res) => {
    const { amount } = req.body; // Assuming amount is sent in INR

    try {
        // Convert amount to paise if it's not already in paise
        const amountInPaise = 34 * 100;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Your Product Name',
                    },
                    unit_amount: amountInPaise, // Now in paise
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/cancelled`,
        });

        res.status(200).json({ url: session.url }); // Redirect to the Stripe-hosted payment page
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {test, checkout}