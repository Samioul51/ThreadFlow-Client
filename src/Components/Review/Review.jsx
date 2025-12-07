import React from 'react';

const Review = ({review}) => {
    const {name,rev}=review;
    return (
        <div className='italic flex flex-col justify-center items-center gap-5 bg-[#1a1a1a] p-[3rem] border-[1px] border-solid border-[#333] h-[200px]'>
            <p className='text-white text-justify'>"{rev}"</p>
            <p className='text-white font-playfair font-bold'>- {name}</p>
        </div>
    );
};

export default Review;