import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const UserOrders = () => {
    const { user } = use(AuthContext);
    const [myOrders,setMyOrders]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                const response=await fetch("http://localhost:3000/orders");
                const data=await response.json();
                const orders=data.data.filter(order => order.email === user.email);
                setMyOrders(orders);
            }catch(error){
                toast.error("Failed to load orders!");
            }
        };

        fetchOrders();
    },[user.email]);
    // console.log(user);
    // console.log(myOrders);

    const [id,setID]=useState("");
    const handleOpenModal = (orderID) => {
        setID(orderID);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setID("");
    }

    const handleDelete=async ()=>{
        if(!id)
            return;
        const response=await fetch(`http://localhost:3000/orders/${id}`,{
            method:"DELETE"
        });

        if(!response.ok)
            throw new Error("Failed to delete order!");

        await response.json();
        
        const remaining=myOrders.filter(order=>order._id!==id);
        setMyOrders(remaining);
        toast.success("Order cancelled successfully");
        handleCloseModal();
    }

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
                                                {order.deliveryStatus.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.paymentStatus.toUpperCase()}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button onClick={()=>navigate(`/dashboard/track-order/${order._id}`)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    VIEW
                                                </button>
                                                {
                                                    order.paymentStatus === "pending" && <button onClick={()=>handleOpenModal(order._id)} className="w-full btn btn-error">CANCEL</button>
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

            {/* Modal for deletion */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to cancel order?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleDelete} className="btn">Yes</button>
                            <button onClick={handleCloseModal} className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UserOrders;