import React, { use, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';

const ordersPromise = fetch("http://localhost:3000/orders").then(res => res.json());

const ApprovedOrders = () => {
    const { user, userData } = use(AuthContext);
    const data = use(ordersPromise);

    const orders = data.data;

    const myApprovedOrders = orders.filter(order => order.sellerEmail === user.email && order.deliveryStatus !== "pending" && order.deliveryStatus !== "rejected");

    console.log(myApprovedOrders);

    const [selectedOrder, setSelectedOrder] = useState(null);
    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>APPROVED ORDERS</p>
            {
                myApprovedOrders.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>ORDER ID</th>
                                    <th className='text-black font-bold font-playfair'>USER</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT NAME</th>
                                    <th className='text-black font-bold font-playfair'>QUANTITY</th>
                                    <th className='text-black font-bold font-playfair'>APPROVED DATE</th>
                                    <th className='text-black font-bold font-playfair'>STATUS</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    myApprovedOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>
                                                {order._id}
                                            </td>
                                            <td>
                                                {order.firstName.toUpperCase()} {order.lastName.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.productName.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.quantity}
                                            </td>
                                            <td>
                                                {order.orderConfirmed.split("T")[0]}
                                            </td>
                                            <td>
                                                {order.deliveryStatus.toUpperCase()}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    UPDATE
                                                </button>
                                                <button className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>VIEW</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO APPROVED ORDERS FOUND!</p>
                    </div>
            }
        </div>
    );
};

export default ApprovedOrders;