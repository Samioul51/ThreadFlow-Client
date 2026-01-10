import React from 'react';

const CardSkeleton = () => {
    return (
        <div className="w-full bg-white-bg shadow-lg rounded-lg overflow-hidden mx-auto font-inter animate-pulse">

            <div className="bg-gray-200 aspect-square w-full">
                <div className="skeleton w-full h-full"></div>
            </div>

            <div className="p-5 flex flex-col gap-3">
                <div className="skeleton h-6 w-3/4"></div>   
                <div className="skeleton h-4 w-1/3"></div>   
                <div className="skeleton h-7 w-1/2"></div>   
                <div className="skeleton h-4 w-2/3"></div>   

                <div className="skeleton h-10 w-full rounded"></div>
            </div>
        </div>
    );
};

export default CardSkeleton;