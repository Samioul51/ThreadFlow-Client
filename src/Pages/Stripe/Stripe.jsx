import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import React, { use, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { motion, useScroll } from "framer-motion"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Stripe = () => {
    const { userToken } = use(AuthContext);
    const { state } = useLocation();
    const newOrder = state?.newOrder;
    const availableQuantity = state?.availableQuantity;
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

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
    }, [newOrder, userToken]);

    if (!newOrder)
        return <div className='w-full max-w-[1440px] flex justify-center items-center h-[50vh]'>
            <p className='font-playfair text-2xl text-center font-bold text-black'>NO ORDER FOUND!</p>
        </div>;

    // console.log(newOrder);
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#545454",
                    zIndex: 9999
                }}
            />
            <div className="max-w-xl mx-auto mt-16">
                <title>{`ThreadFlow | Stripe Payment`}</title>
                <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>Stripe Payment</p>
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm newOrder={newOrder} availableQuantity={availableQuantity} navigate={navigate} />
                    </Elements>
                )}
            </div>
        </>
    );
};

export default Stripe;