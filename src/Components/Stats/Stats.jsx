import React from 'react';

const Stats = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>Statistics</p>
            <div className='grid grid-cols-1 lg:grid-cols-4 px-4 gap-4 auto-rows-fr'>
                <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                    <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>5000+</p>
                    <p className='text-[#666]'>Orders Delivered</p>
                </div>
                <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                    <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>500+</p>
                    <p className='text-[#666]'>Happy Clients</p>
                </div>
                <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                    <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>98%</p>
                    <p className='text-[#666]'>On-Time Delivery</p>
                </div>
                <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                    <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>24/7</p>
                    <p className='text-[#666]'>Support Available</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;