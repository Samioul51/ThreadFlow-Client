import React from 'react';
import Service from '../Service/Service';

const services=[
    {
        id:"1",
        title:"Browse Products",
        description:"Explore our extensive catalog of quality garments with detailed specifications and pricing."
    },
    {
        id:"2",
        title:"Place Order",
        description:"Select your products, specify quantities, and submit your order with preferred payment options."
    },
    {
        id:"3",
        title:"Track Production",
        description:"Monitor real-time production stages from cutting to finishing with detailed tracking updates."
    },
    {
        id:"4",
        title:"Receive Delivery",
        description:"Get timely delivery with complete transparency throughout the shipping process."
    }
];

const HowItWorks = () => {

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-5'>How It Works</p>
            <p className='font-inter text-[#666666] text-center mb-10'>Simple steps to manage your garment production efficiently</p>
            
            <div className='grid grid-cols-1 lg:grid-cols-4 px-4 gap-4 auto-rows-fr'>
                {
                    services.map(service=><Service key={service.id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default HowItWorks;