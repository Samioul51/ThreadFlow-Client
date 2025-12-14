import React, { use, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const ordersPromise = fetch("http://localhost:3000/orders").then(res => res.json());

const ApprovedOrders = () => {
    const { user, userData } = use(AuthContext);
    const data = use(ordersPromise);

    const orders = data.data;

    const myApprovedOrders = orders.filter(order => order.sellerEmail === user.email && order.deliveryStatus !== "pending" && order.deliveryStatus !== "rejected");

    // console.log(myApprovedOrders);

    const steps = [
        { id: 1, title: 'Order Confirmed', statusKey: 'orderConfirmed' },
        { id: 2, title: 'Cutting Completed', statusKey: 'cuttingCompleted' },
        { id: 3, title: 'Sewing Started', statusKey: 'sewingStarted' },
        { id: 4, title: 'Finishing', statusKey: 'finishing' },
        { id: 5, title: 'QC Checked', statusKey: 'qcChecked' },
        { id: 6, title: 'Packed', statusKey: 'packed' },
        { id: 7, title: 'Shipped', statusKey: 'shipped' }
    ];

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusValue, setStatusValue] = useState("orderConfirmed");
    const [viewOrder, setViewOrder] = useState(null);

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

    // For Timeline

    const handleOpenViewModal = (order) => {
        setViewOrder(order);
        setStatusValue(order.deliveryStatus);
        document.getElementById("view_order_modal").showModal();
    }

    const handleCloseViewModal = () => {
        document.getElementById("view_order_modal").close();
        setViewOrder(null);
    }

    const getStepClass = (order, index) => {
        const currentStep = steps.reduce((lastIndex, step, idx) => {
            if (order.productionStatus?.[step.statusKey]?.date) return idx + 1;
            return lastIndex;
        }, 0);

        if (index < currentStep) return "completed";
        if (index === currentStep) return "active";
        return "pending";
    }


    const getStatusLabel = (stepClass) => {
        if (stepClass === "completed")
            return "completed";
        if (stepClass === "active")
            return "In Progress";
        return "Pending";
    }


    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <title>{`ThreadFlow | Manager - Approved Orders`}</title>
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
                                    <th className='text-black font-bold font-playfair'>COMPLETED STEP</th>
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
                                                {order?.productionStatus?.["orderConfirmed"].date.split("T")[0]}
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
                                                    order.deliveryStatus !== "shipped" &&
                                                    <button
                                                        onClick={() => handleOpenUpdateModal(order)}
                                                        className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                        UPDATE
                                                    </button>
                                                }

                                                <button
                                                    onClick={() => handleOpenViewModal(order)} className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>VIEW</button>
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
            {/* Update Modal */}
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

            {/* Timeline Modal */}
            <dialog id="view_order_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg text-center mb-5">Order Timeline</h3>
                    {viewOrder && (
                        <div className="flex flex-col gap-6">
                            {steps.map((step, index) => {
                                const stepClass = getStepClass(viewOrder, index);
                                const statusLabel = getStatusLabel(stepClass);
                                const previousStepLocation = index > 0 ? viewOrder?.productionStatus?.[steps[index - 1].statusKey]?.location : null;

                                return (
                                    <div key={step.id} className="flex relative">
                                        {index < steps.length - 1 && (
                                            <div className="absolute left-5 top-10 bottom-0 w-0.5"
                                                style={{ backgroundColor: stepClass === 'pending' ? '#e2e8f0' : '#0f172a' }}
                                            />
                                        )}

                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 z-10 flex-shrink-0`}
                                            style={{
                                                backgroundColor: stepClass === 'completed' ? '#0f172a' : 'white',
                                                border: stepClass === 'pending' ? '2px solid #e2e8f0' : '2px solid #0f172a',
                                                color: stepClass === 'completed' ? 'white' : stepClass === 'active' ? '#0f172a' : '#94a3b8'
                                            }}
                                        >
                                            {stepClass === 'completed' ? (
                                                <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                                </svg>
                                            ) : <span className="font-semibold">{step.id}</span>}
                                        </div>

                                        <div className="flex-1 pb-2">
                                            <div className="font-semibold mb-1" style={{ color: stepClass === 'pending' ? '#94a3b8' : '#0f172a' }}>
                                                {step.title}
                                            </div>

                                            <div className="inline-block px-2 py-1 rounded-xl text-xs font-medium"
                                                style={{
                                                    backgroundColor: stepClass === 'completed' ? '#dcfce7' : stepClass === 'active' ? '#dbeafe' : '#f1f5f9',
                                                    color: stepClass === 'completed' ? '#166534' : stepClass === 'active' ? '#1d4ed8' : '#64748b'
                                                }}>
                                                {statusLabel}
                                            </div>

                                            {stepClass === 'completed' && viewOrder?.productionStatus?.[step.statusKey] && (
                                                <div className="text-xs text-gray-400 mt-1">
                                                    <p>📅 {viewOrder?.productionStatus?.[step.statusKey].date.split("T")[0]}</p>
                                                </div>
                                            )}

                                            {stepClass === 'active' && previousStepLocation && (
                                                <div className="text-xs text-gray-400 mt-1">
                                                    <p>📍 {previousStepLocation}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="modal-action mt-4">
                        <button className="btn" onClick={handleCloseViewModal}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ApprovedOrders;