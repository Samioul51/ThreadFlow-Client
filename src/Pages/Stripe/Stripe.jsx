import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import React, { use, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Stripe = () => {
    const {userToken}=use(AuthContext);
    const { state } = useLocation();
    const newOrder = state?.newOrder;
    const availableQuantity=state?.availableQuantity;
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (!newOrder)
            return;

        fetch("http://localhost:3000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({ amount: newOrder.totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret);
            })
    }, [newOrder]);

    if (!newOrder)
        return <div className='w-full max-w-[1440px] flex justify-center items-center h-[50vh]'>
            <p className='font-playfair text-2xl text-center font-bold text-black'>NO ORDER FOUND!</p>
        </div>;

    // console.log(newOrder);
    return (
        <div className="max-w-xl mx-auto mt-16">
            <title>{`ThreadFlow | Stripe Payment`}</title>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>Stripe Payment</p>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm newOrder={newOrder} availableQuantity={availableQuantity} navigate={navigate} />
                </Elements>
            )}
        </div>
    );
};

export default Stripe;