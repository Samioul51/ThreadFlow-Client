import React, { use, useRef, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider'
import toast from 'react-hot-toast';
import { motion, useScroll } from "framer-motion"

const ProductDetails = () => {
    const product = useLoaderData().data;
    const { scrollYProgress } = useScroll();
    const user = use(AuthContext);
    const navigate = useNavigate();
    // console.log(user);
    // console.log(product);
    const { _id, productName, category, productDescription, price, availableQuantity, minimumOrderQuantity, images, paymentOptions, email } = product;

    const [totalPrice, setTotalPrice] = useState(minimumOrderQuantity * price);

    const orderModalRef = useRef(null);
    const handleModalOpen = () => {
        orderModalRef.current.showModal();
    }

    const handlePrice = (e) => {
        setTotalPrice(e.target.value * price);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const quantity = form.quantity.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const additionalNotes = form.additionalNotes.value;

        const newOrder = {
            productID: _id,
            email: user?.user?.email,
            productName: productName,
            firstName: firstName,
            lastName: lastName,
            quantity: quantity,
            totalPrice: totalPrice,
            phone: phone,
            address: address,
            additionalNotes: additionalNotes,
            paymentOption: paymentOptions,
            sellerEmail: (email ? email : ""),
            deliveryStatus: "pending",

            createdAt: new Date()
        }

        if (paymentOptions === "Stripe") {
            // console.log("stripe");
            navigate("/payment", {
                state: { newOrder: newOrder, availableQuantity: availableQuantity }
            })
        }
        else {
            const order = { ...newOrder, paymentStatus: "pending" };
            const orderResponse = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.userToken}`
                },
                body: JSON.stringify(order)
            });

            if (!orderResponse.ok)
                throw new Error(`Order failed: ${orderResponse.status}`);

            const orderData = await orderResponse.json();

            const stockResponse = await fetch(`http://localhost:3000/products/${product._id}/stock`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.userToken}`
                },
                body: JSON.stringify({
                    quantitySold: quantity
                })
            });

            if (!stockResponse.ok)
                throw new Error(`Stock update failed: ${stockResponse.status}`);
            orderModalRef.current.close();
            navigate("/");
            toast.success("Order completed successfully!");
        }
    }

    const allImages = [
        {
            original: images[0], thumbnail: images[0]
        },
        {
            original: images[1], thumbnail: images[1]
        },
        {
            original: images[2], thumbnail: images[2]
        }
    ];
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
            <div className='w-full max-w-[1440px] mx-auto h-auto px-4 font-inter'>
                <title>{`ThreadFlow | ${productName}`}</title>
                <div className='w-full bg-fafafa-bg shadow-xl flex flex-col items-center lg:items-start gap-5 lg:flex-row mt-16'>
                    <div className='w-full lg:max-w-[50%] h-auto'>
                        <ReactImageGallery items={allImages}></ReactImageGallery>
                    </div>
                    <div className='w-full lg:max-w-[50%] h-auto flex-col px-5 py-5 box-border'>
                        <div className='w-[150px] p-2 bg-black text-center font-playfair text-white font-medium mb-5'>{category.toUpperCase()}</div>
                        <p className='text-5xl font-bold text-black font-playfair mb-5'>{productName}</p>
                        <p className='text-3xl font-bold text-black font-playfair mb-5'>৳ {price}</p>
                        <div className='w-full p-2 border border-solid border-[#38a169] bg-[#f0fff4] text-[#22543d] font-medium mb-5'>• In Stock - {availableQuantity} Units Available</div>
                        <p className='text-[#666666] text-justify mb-5'>{productDescription}</p>
                        <hr className='border-[#666666] mb-5' />
                        <div className='flex gap-20 mb-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-black font-bold'>AVAILABLE QUANTITY</p>
                                <p className='text-[#666666] font-medium'>{availableQuantity} Units</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-black font-bold'>MINIMUM ORDERS</p>
                                <p className='text-[#666666] font-medium'>{minimumOrderQuantity} Units</p>
                            </div>
                        </div>
                        <hr className='border-[#666666] mb-5' />
                        <div className='flex flex-col gap-5 mb-20'>
                            <p className='font-playfair text-black font-bold text-[20px]'>Payment Options</p>
                            <div className='flex gap-5'>
                                <span className="inline-flex items-center px-2 py-1 ring-1 ring-inset ring-default text-heading text-sm font-medium rounded bg-neutral-primary-soft">{paymentOptions}</span>

                            </div>
                        </div>
                        {
                            user?.userData?.role === "buyer" ? (
                                user?.userData?.roleStatus === "suspended" ?
                                    <div className='w-full p-2 border border-solid border-red-400 bg-[#f0fff4] text-center text-red-600 font-medium mb-5'>YOU ARE SUSPENDED SO CAN'T ORDER!</div>
                                    : (
                                        user?.userData?.roleStatus === "pending" ?
                                            <div className='w-full p-2 border border-solid border-blue-400 bg-[#f0fff4] text-center text-blue-600 font-medium mb-5'>YOUR REQUEST IS UNDER REVIEW SO CAN'T ORDER!</div>
                                            :
                                            <button onClick={handleModalOpen} className='w-full bg-[#000000] text-[#ffffff] border-none text-[1.1rem] p-[1.2rem] cursor-pointer font-medium hover:bg-gray-800 transition-colors ease-in-out duration-500'>PLACE ORDER</button>
                                    )

                            )

                                :
                                <div className='w-full p-2 border border-solid border-red-400 bg-[#f0fff4] text-center text-red-600 font-medium mb-5'>YOU CAN'T ORDER</div>
                        }

                    </div>
                </div>

                <dialog ref={orderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Place Your Order</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={user?.user?.email}
                                    name="email"
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={productName}
                                    name="productTitle"
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={price}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Your first name"
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Your last name"
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    defaultValue={minimumOrderQuantity}
                                    min={minimumOrderQuantity}
                                    max={availableQuantity}
                                    className="input input-bordered w-full"
                                    onChange={handlePrice}
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Total Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="totalPrice"
                                    value={totalPrice}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Contact Number</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your contact number"
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text">Delivery Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Your address"
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Additional Notes</span>
                                </label>
                                <textarea
                                    name="additionalNotes"
                                    placeholder="Any additional info"
                                    className="textarea textarea-bordered w-full resize-none"
                                />
                            </div>

                            {
                                minimumOrderQuantity > availableQuantity && <div className='w-full p-2 border border-solid border-[#38a169] bg-[#f0fff4] text-[#22543d] font-medium mb-5'>Not enough stock</div>
                            }

                            <div className="modal-action justify-between">
                                <button
                                    type="button" className="btn mt-4 cursor-pointer"
                                    onClick={() => orderModalRef.current.close()}
                                >
                                    Cancel
                                </button>
                                {
                                    minimumOrderQuantity <= availableQuantity &&
                                    <button type="submit" className="btn mt-4 cursor-pointer">
                                        Place Order
                                    </button>
                                }

                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    );
}

export default ProductDetails;