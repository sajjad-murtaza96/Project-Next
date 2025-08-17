'use server'
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const createPaymentIntent = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
        const { amount, currency } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            return res.status(200).json({ secretKey: paymentIntent.client_secret });
        } catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : error });
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });

};

export default createPaymentIntent;