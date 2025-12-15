import React from 'react';

const Service = ({service}) => {
    const {title,description}=service;
    return (
        <div className='w-full flex flex-col justify-center items-center bg-fafafa-bg p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
            <p className='text-[1.3rem] mb-[1rem] text-black font-playfair font-bold'>{title}</p>
            <p className='text-[#666]'>{description}</p>
        </div>
    );
};

export default Service;