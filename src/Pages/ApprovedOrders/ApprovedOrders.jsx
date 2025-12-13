import React, { use, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const ordersPromise = fetch("http://localhost:3000/orders").then(res => res.json());

const ApprovedOrders = () => {
    const { user, userData } = use(AuthContext);
    const data = use(ordersPromise);

    const orders = data.data;

    const myApprovedOrders = orders.filter(order => order.sellerEmail === user.email && order.deliveryStatus !== "pending" && order.deliveryStatus !== "rejected");

    console.log(myApprovedOrders);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusValue, setStatusValue] = useState("orderConfirmed");
    // For update

    const handleOpenUpdateModal = (order) => {
        setSelectedOrder(order);
        setStatusValue(order.deliveryStatus);
        document.getElementById("update_order_modal").showModal();
    }

    const handleCloseUpdateModal = () => {
        document.getElementById("update_order_modal").close();
        setSelectedOrder(null);
    }


    const handleOrderUpdate = async (e) => {
        e.preventDefault();
        if (!selectedOrder)
            return;

        const form = e.target;

        const location = form.location.value;
        const statusKey = form.statusKey.value;

        if (!statusKey || (statusValue !== "shipped" && !location)) {
            toast.error("Status and Location required!");
            return;
        }

        const body = { statusKey };
        if (statusValue !== "shipped")
            body.location = location;

        const res = await fetch(`http://localhost:3000/orders/${selectedOrder._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            toast.success("Order updated!");
            handleCloseUpdateModal();
        }
        else
            toast.error("Update failed!");

    }


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
                                                {order.productionStatus["orderConfirmed"].date.split("T")[0]}
                                            </td>
                                            <td>
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
                                            <td className='flex flex-col items-center gap-1'>
                                                {
                                                    order.deliveryStatus !== "shipped" && <button
                                                        onClick={() => handleOpenUpdateModal(order)}
                                                        className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                        UPDATE
                                                    </button>
                                                }

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
            <dialog id="update_order_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg">Update Order</h3>
                    <form onSubmit={handleOrderUpdate}>

                        {/* Updated Status */}
                        <div className="mt-3">
                            <label className="font-medium">Updated Completed Step</label>
                            <select
                                name="statusKey"
                                className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300w-full bg-[#fafafa]"
                                value={statusValue}
                                onChange={(e) => setStatusValue(e.target.value)}
                            >
                                <option value="orderConfirmed">Order Confirmed</option>
                                <option value="cuttingCompleted">Cutting Completed</option>
                                <option value="sewingStarted">Sewing Started</option>
                                <option value="finishing">Finishing</option>
                                <option value="qcChecked">QC Checked</option>
                                <option value="packed">Packed</option>
                                <option value="shipped">Shipped</option>
                            </select>
                            {/* Order Location */}
                            <div className="mt-3">
                                <label className="font-medium">Updated Next Step's Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Current Location"
                                    className="input w-full bg-gray-100 cursor-not-allowed"
                                    defaultValue={statusValue === "shipped" ? selectedOrder?.address : ""}
                                    disabled={statusValue === "shipped"}
                                />
                            </div>
                        </div>


                        <div className="modal-action">
                            <button type="submit" className="btn">
                                Update
                            </button>
                            <button className="btn" onClick={handleCloseUpdateModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ApprovedOrders;