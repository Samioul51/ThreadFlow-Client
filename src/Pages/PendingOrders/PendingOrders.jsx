import React, { use, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import StatusPieChart from '../../Components/StatusPieChart/StatusPieChart';

const ordersPromise = fetch("http://localhost:3000/orders").then(res => res.json());


const PendingOrders = () => {
    const { user, userData } = use(AuthContext);
    const data = use(ordersPromise);

    const orders = data.data;

    const myPendingOrders = orders.filter(order => order.sellerEmail === user.email && order.deliveryStatus === "pending");

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [actionType, setActionType] = useState("");
    // console.log(myPendingOrders);

    const pendingCount = orders.filter(o => o.deliveryStatus === "pending").length;
    const approvedCount = orders.filter(o => o.deliveryStatus !== "pending" && o.deliveryStatus !== "rejected").length;
    const rejectedCount = orders.filter(o => o.deliveryStatus === "rejected").length;

    const chartData = [
        {
            name: "Approved",
            value: approvedCount
        },
        {
            name: "Pending",
            value: pendingCount
        },
        {
            name: "Suspended",
            value: rejectedCount
        }
    ];

    const handleConfirmAction = async () => {
        if (!selectedOrder)
            return;

        const newStatus = actionType === "approve"
            ?
            "Order Confirmed" : "rejected"

        const statusKey = actionType === "approve" ? "orderConfirmed" : undefined;

        // console.log(selectedOrder);

        const res = await fetch(`http://localhost:3000/orders/${selectedOrder._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                statusKey,
                location: "Main Cutting Floor"
            })
        });

        const data = await res.json();

        if (data.success) {
            toast.success(`ORDER ${newStatus.toUpperCase()}!`);
            document.getElementById("action_modal").close();
            setSelectedOrder(null);
            setActionType("");
            window.location.reload();
        }
        else
            toast.error("Failed to update order!")
    }

    const handleViewModal = (order) => {
        setSelectedOrder(order);
        document.getElementById("view_order_modal").showModal();
    }

    const closeViewModal = () => {
        setSelectedOrder(null);
        document.getElementById("view_order_modal").close();
    }

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <title>{`ThreadFlow | Manager - Pending Orders`}</title>
            <p className='font-playfair text-black text-3xl font-bold text-center'>ORDER STATUS ANALYSIS</p>
            <StatusPieChart data={chartData}></StatusPieChart>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>PENDING ORDERS</p>
            {
                myPendingOrders.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>ORDER ID</th>
                                    <th className='text-black font-bold font-playfair'>USER</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT NAME</th>
                                    <th className='text-black font-bold font-playfair'>QUANTITY</th>
                                    <th className='text-black font-bold font-playfair'>ORDER DATE</th>
                                    <th className='text-black font-bold font-playfair'>STATUS</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    myPendingOrders.map(order => (
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
                                                {order.createdAt.split("T")[0]}
                                            </td>
                                            <td>
                                                {order.deliveryStatus.toUpperCase()}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                {
                                                    userData?.roleStatus === "suspended"
                                                        ?
                                                        <div className='w-full p-2 border border-solid border-red-400 bg-[#f0fff4] text-center text-red-600 font-medium'>SUSPENDED</div>
                                                        :
                                                        (
                                                            order?.deliveryStatus !== "pending"
                                                                ?
                                                                (
                                                                    order.deliveryStatus !== "approved"
                                                                        ?
                                                                        <div className='w-full p-2 border border-solid border-green-400 bg-[#f0fff4] text-center text-green-600 font-medium'>APPROVED</div>
                                                                        :
                                                                        <div className='w-full p-2 border border-solid border-red-400 bg-[#f0fff4] text-center text-red-600 font-medium'>REJECTED</div>
                                                                )
                                                                :
                                                                <>
                                                                    <button onClick={() => {
                                                                        setSelectedOrder(order);
                                                                        setActionType("approve");
                                                                        // console.log(order);
                                                                        document.getElementById("action_modal").showModal();
                                                                    }} className='w-full btn btn-success'>
                                                                        APPROVE
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        setSelectedOrder(order);
                                                                        setActionType("reject");
                                                                        document.getElementById("action_modal").showModal();
                                                                    }} className="w-full btn btn-error">REJECT</button>
                                                                </>
                                                        )
                                                }
                                                <button onClick={() => handleViewModal(order)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>VIEW</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO PENDING ORDERS FOUND!</p>
                    </div>
            }
            {/* View Modal */}
            <dialog id="view_order_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-xl mb-4 pb-3 border-b">Order Details</h3>

                    {selectedOrder && (
                        <div className="space-y-4">
                            {/* Order Information */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm text-base-content/70 mb-2">Order Information</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-base-content/60">Order ID</p>
                                        <p className="font-medium">{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Order Date</p>
                                        <p className="font-medium">{selectedOrder.createdAt.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm text-base-content/70 mb-2">Customer Information</h4>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-base-content/60">Name</p>
                                        <p className="font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Phone</p>
                                        <p className="font-medium">{selectedOrder.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Address</p>
                                        <p className="font-medium">{selectedOrder.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm text-base-content/70 mb-2">Product Information</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-base-content/60">Product</p>
                                        <p className="font-medium">{selectedOrder.productName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Quantity</p>
                                        <p className="font-medium">{selectedOrder.quantity}</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-base-300">
                                    <p className="text-xs text-base-content/60">Total Price</p>
                                    <p className="font-bold text-lg">{selectedOrder.totalPrice} BDT</p>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-base-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-sm text-base-content/70 mb-2">Payment Information</h4>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-base-content/60">Payment Option</p>
                                        <p className="font-medium">{selectedOrder.paymentOption}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Payment Status</p>
                                        <p className="font-medium">
                                            <span className={`badge ${selectedOrder.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                                {selectedOrder.paymentStatus.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                    {selectedOrder.paymentStatus === "paid" && (
                                        <div>
                                            <p className="text-xs text-base-content/60">Transaction ID</p>
                                            <p className="font-medium">{selectedOrder.transactionID}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Notes */}
                            {selectedOrder.additionalNotes && (
                                <div className="bg-base-200 p-4 rounded-lg">
                                    <h4 className="font-semibold text-sm text-base-content/70 mb-2">Additional Notes</h4>
                                    <p className="text-sm">{selectedOrder.additionalNotes}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="modal-action mt-6">
                        <button className="btn btn-neutral" onClick={closeViewModal}>Close</button>
                    </div>
                </div>
            </dialog>

            {/* Action Modal */}
            <dialog id="action_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl">
                        {actionType === "approve" ? "Approve Order?" : "Reject Order?"}
                    </h3>

                    <p className="py-4 text-base">
                        Are you sure you want to
                        <span>
                            {" "}{actionType}
                        </span>
                        {" "}this order?
                    </p>

                    <div className="modal-action flex gap-2">
                        <button
                            className="btn"
                            onClick={handleConfirmAction}
                        >
                            Yes
                        </button>
                        <button className="btn"
                            onClick={() => document.getElementById("action_modal").close()}>
                            No
                        </button>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default PendingOrders;