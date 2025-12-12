import React from 'react';
import { useLoaderData } from 'react-router';

const UserTrackOrder = () => {
    const order = useLoaderData().data;
    // console.log(order);

    const statusSteps = {
        'Order Placed':0,
        'Cutting Completed': 1,
        'Sewing Started': 2,
        'Finishing': 3,
        'QC Checked': 4,
        'Packed': 5,
        'Shipped': 6
    }

    const steps = [
        { id: 1, title: 'Order Placed', statusKey: 'Order Placed' },
        { id: 2, title: 'Cutting Completed', statusKey: 'Cutting Completed' },
        { id: 3, title: 'Sewing Started', statusKey: 'Sewing Started' },
        { id: 4, title: 'Finishing', statusKey: 'Finishing' },
        { id: 5, title: 'QC Checked', statusKey: 'QC Checked' },
        { id: 6, title: 'Packed', statusKey: 'Packed' },
        { id: 7, title: 'Shipped', statusKey: 'Shipped' }
    ];

    const currentStep = order?.deliveryStatus ? statusSteps[order.deliveryStatus] : 1;

    const getStepClass = (index) => {
        if (index < currentStep)
            return "completed";
        if (index === currentStep)
            return "active";
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
        <div className='py-5 px-5 mx-10 mt-10 flex flex-col items-center bg-white font-inter'>
            <div className='w-full bg-[#FAFAFA] shadow-xl flex flex-col items-center lg:items-start gap-5 lg:flex-row mt-16'>
                <div className='w-full lg:max-w-[50%] h-auto flex-col px-5 py-5 box-border'>
                    <p className='text-5xl font-bold text-black font-playfair mb-5'>{order.productName.toUpperCase()}</p>
                    <div className='w-full p-2 border border-solid border-[#38a169] bg-[#f0fff4] text-[#22543d] font-medium mb-5'>• TRACKING ID - {order._id} </div>
                    <p className='text-[#666666] text-justify mb-5'>TOTAL PRICE: ৳ {order.totalPrice}</p>
                    <hr className='border-[#666666] mb-5' />
                    <div className='flex gap-20 mb-5'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>QUANTITY</p>
                            <p className='text-[#666666] font-medium'>{order.quantity} Units</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>PAYMENT STATUS</p>
                            <p className='text-[#666666] font-medium'>{order.paymentStatus.toUpperCase()}</p>
                        </div>
                    </div>
                    <hr className='border-[#666666] mb-5' />
                    <div className='flex gap-20 mb-5'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>Address</p>
                            <p className='text-[#666666] font-medium'>{order.address}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>ORDER DATE</p>
                            <p className='text-[#666666] font-medium'>{order.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:max-w-[50%] h-auto flex-col px-5 py-5 box-border'>
                    <p className="text-2xl font-bold text-gray-900 mb-6 text-center">PRODUCTION STATUS</p>
                    <div className="flex flex-col gap-8">
                        {steps.map((step, index) => {
                            const stepClass = getStepClass(index);
                            const statusLabel = getStatusLabel(stepClass);

                            return (
                                <div key={step.id} className="flex relative">
                                    {/* Vertical Line */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className="absolute left-5 top-10 w-0.5"
                                            style={{
                                                height: '48px',
                                                backgroundColor:
                                                    stepClass === 'pending'
                                                        ? '#e2e8f0'
                                                        : '#0f172a'
                                            }}
                                        />
                                    )}

                                    {/* Circle */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center mr-4 z-10 flex-shrink-0"
                                        style={{
                                            backgroundColor:
                                                stepClass === 'completed'
                                                    ? '#0f172a'
                                                    : 'white',
                                            border:
                                                stepClass === 'pending'
                                                    ? '2px solid #e2e8f0'
                                                    : '2px solid #0f172a',
                                            color:
                                                stepClass === 'completed'
                                                    ? 'white'
                                                    : stepClass === 'active'
                                                        ? '#0f172a'
                                                        : '#94a3b8'
                                        }}
                                    >
                                        {stepClass === 'completed' ? (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                width="20"
                                                height="20"
                                            >
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                            </svg>
                                        ) : (
                                            <span className="font-semibold">{step.id}</span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-2">
                                        <div
                                            className="font-semibold mb-1"
                                            style={{
                                                color:
                                                    stepClass === 'pending'
                                                        ? '#94a3b8'
                                                        : '#0f172a'
                                            }}
                                        >
                                            {step.title}
                                        </div>

                                        <div
                                            className="inline-block px-2 py-1 rounded-xl text-xs font-medium"
                                            style={{
                                                backgroundColor:
                                                    stepClass === 'completed'
                                                        ? '#dcfce7'
                                                        : stepClass === 'active'
                                                            ? '#dbeafe'
                                                            : '#f1f5f9',
                                                color:
                                                    stepClass === 'completed'
                                                        ? '#166534'
                                                        : stepClass === 'active'
                                                            ? '#1d4ed8'
                                                            : '#64748b'
                                            }}
                                        >
                                            {statusLabel}
                                        </div>

                                        {stepClass !== 'pending' && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {step.time}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTrackOrder;