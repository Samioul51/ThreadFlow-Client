import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ newOrder, navigate }) => {
    const stripe = useStripe();
    const elements = useElements();

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
            const order = { ...newOrder, paymentStatus: "paid" };

            // Save Paid Order to DB
            fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            }).then(() => {
                toast.success("Payment successful! Order placed.");
                navigate("/");
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement></PaymentElement>

            <button disabled={!stripe} className='w-full bg-[#000000] text-[#ffffff] border-none text-[1.1rem] p-[1.2rem] cursor-pointer font-medium hover:bg-gray-800 transition-colors ease-in-out duration-500'>
                Pay Now
            </button>
        </form>
    );
};

export default CheckoutForm;
