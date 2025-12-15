import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { use } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const CheckoutForm = ({ newOrder,availableQuantity,navigate }) => {
    const {userToken}=use(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    // console.log(newOrder);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements)
            return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/success"
            },
            redirect: "if_required"
        });

        if (error) {
            toast.error(error.message);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            const order = { ...newOrder, paymentStatus: "paid", transactionID: paymentIntent.id, paidAmount: paymentIntent.amount / 100 };

            fetch("https://thread-flow-server.vercel.app/orders", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify(order)
            }).then(() => {
                fetch(`https://thread-flow-server.vercel.app/products/${newOrder.productID}/stock`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:`Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        quantitySold: newOrder.quantity
                    })
                });
                toast.success("Payment successful! Order placed.");
                navigate("/");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement></PaymentElement>

            <button disabled={!stripe} className='w-full bg-[#000000] text-[#ffffff] border-none text-[1.1rem] mt-5 p-[1.2rem] cursor-pointer font-medium hover:bg-gray-800 transition-colors ease-in-out duration-500'>
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;
