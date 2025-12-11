import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate=useNavigate();

    return (
        <div className='w-full max-w-[1440px] flex flex-col justify-center gap-5 items-center mx-auto h-screen px-4 font-inter'>
            <p className="text-2xl font-bold text-black font-playfair">403 — Forbidden</p>
            <button onClick={()=>navigate(-1)} className='text-white bg-black rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer hover:bg-gray-800 transition-colors ease-in-out duration-500 '>Go Back</button>
        </div>
    );
};

export default Forbidden;