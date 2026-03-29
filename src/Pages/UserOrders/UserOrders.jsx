import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import StatusPieChart from '../../Components/StatusPieChart/StatusPieChart';
import { motion, useScroll } from "framer-motion"

const UserOrders = () => {
    const { user, userToken } = use(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                const data = await response.json();
                const orders = data.data.filter(order => order.email === user.email);
                setMyOrders(orders);
            } catch (error) {
                toast.error("Failed to load orders!");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user.email, userToken]);
    // console.log(user);
    // console.log(myOrders);

    const pendingCount = myOrders.filter(o => o.deliveryStatus === "pending").length;
    const deliveredCount = myOrders.filter(o => o.deliveryStatus === "shipped").length;
    const rejectedCount = myOrders.filter(o => o.deliveryStatus === "rejected").length;

    const chartData = [
        {
            name: "Delivered",
            value: deliveredCount
        },
        {
            name: "Pending",
            value: pendingCount
        },
        {
            name: "Rejected",
            value: rejectedCount
        }
    ];

    const [id, setID] = useState("");
    const handleOpenModal = (orderID) => {
        setID(orderID);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setID("");
    }

    const handleDelete = async () => {
        if (!id)
            return;
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        if (!response.ok)
            throw new Error("Failed to delete order!");

        await response.json();

        const remaining = myOrders.filter(order => order._id !== id);
        setMyOrders(remaining);
        toast.success("Order cancelled successfully");
        handleCloseModal();
    }

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
            <div className='py-5 mx-5 mt-10 flex flex-col items-center min-h-screen bg-white-bg font-inter'>
                <title>{`ThreadFlow | My Orders`}</title>
                <p className='tf_heading font-playfair text-black text-3xl font-bold text-center mb-5'>MY ORDERS ANALYSIS</p>
                {
                    loading
                        ?
                        (
                            <div className="flex justify-center items-center my-10">
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        )
                        :
                        (
                            <StatusPieChart data={chartData}></StatusPieChart>
                        )
                }
                <p className='tf_heading font-playfair text-black text-3xl font-bold text-center mb-5'>MY ORDERS</p>
                {
                    loading
                        ?
                        (
                            <div className="flex justify-center items-center my-10">
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        )
                        :
                        (

                            myOrders.length > 0 ?
                                <div className="w-full overflow-x-auto">
                                    <table class="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th className='text-black font-bold font-playfair'>ORDER ID</th>
                                                <th className='text-black font-bold font-playfair'>PRODUCT</th>
                                                <th className='text-black font-bold font-playfair'>QUANTITY</th>
                                                <th className='text-black font-bold font-playfair'>COMPLETED STEP</th>
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
                                                            {
                                                                order?.deliveryStatus === "pending" && <span>PENDING</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "orderConfirmed" && <span>ORDER CONFIRMED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "cuttingCompleted" && <span>CUTTING COMPLETED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "sewingStarted" && <span>SEWING STARTED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "finishing" && <span>FINISHING</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "qcChecked" && <span>QC CHECKED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "packed" && <span>PACKED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "shipped" && <span>SHIPPED</span>
                                                            }
                                                            {
                                                                order?.deliveryStatus === "rejected" && <span className='text-red-600'>REJECTED</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            {order.paymentStatus.toUpperCase()}
                                                        </td>
                                                        <td className='flex flex-col items-center gap-1'>
                                                            <button onClick={() => navigate(`/dashboard/track-order/${order._id}`)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                                VIEW
                                                            </button>
                                                            {
                                                                (order.deliveryStatus === "pending" && order.paymentStatus === "pending") && <button onClick={() => handleOpenModal(order._id)} className="w-full btn btn-error">CANCEL</button>
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
                                    <p className='font-playfair text-2xl text-center font-bold text-gray-500'>NO ORDERS FOUND!</p>
                                </div>

                        )
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
        </>
    );
};

export default UserOrders;