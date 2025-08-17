'use client'

import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Loader } from "./components/loader";
import { PaymentHeader } from "./components/payment-header";

export const Payment: React.FC<{}> = () => {
    const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: 1000,
                currency: "usd",
            }),
        }).then((res) => res.json())
            .then((data) => { setClientSecret(data.secretKey); })
            .catch((error) => {
                console.error("Error creating payment intent:", error);
            });

    }, []);

    return (
        <>
            <PaymentHeader />
            {
                clientSecret ?
                    <Elements stripe={stripe} options={{ clientSecret: clientSecret, appearance: { theme: 'stripe' } }}>
                        <PaymentElement />
                    </Elements> : <Loader />
            }
        </>

    );
}