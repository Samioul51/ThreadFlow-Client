import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';

const orderPromise = fetch("http://localhost:3000/orders").then(res => res.json());


const UserOrders = () => {
    const { user } = use(AuthContext);
    const allOrders = use(orderPromise).data;
    // console.log(allOrders);
    const myOrders = allOrders.filter(order => order.email === user.email);
    // console.log(user);
    // console.log(myOrders);

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            {
                myOrders.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table class="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>ORDER ID</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT</th>
                                    <th className='text-black font-bold font-playfair'>QUANTITY</th>
                                    <th className='text-black font-bold font-playfair'>STATUS</th>
                                    <th className='text-black font-bold font-playfair'>PAYMENT</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    myOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>
                                                {order._id}
                                            </td>
                                            <td>
                                                {order.productName.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.quantity}
                                            </td>
                                            <td>
                                                {order.paymentStatus.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.paymentOption.toUpperCase()}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    VIEW
                                                </button>
                                                {
                                                    order.paymentStatus === "pending" && <button class="w-full btn btn-error">CANCEL</button>
                                                }

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO ORDERS FOUND!</p>
                    </div>
            }
        </div>
    );
};

export default UserOrders;