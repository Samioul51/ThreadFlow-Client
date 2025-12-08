import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useLoaderData } from 'react-router';

const ProductDetails = () => {
    const product = useLoaderData().data;
    // console.log(product);
    const { productName, category, productDescription, price, availableQuantity, minimumOrderQuantity, images, paymentOptions } = product;

    const handleOrder=()=>{

    }

    const allImages = [
        {
            original: images[0], thumbnail: images[0]
        },
        {
            original: images[1], thumbnail: images[1]
        },
        {
            original: images[2], thumbnail: images[2]
        }
    ];

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto px-4 font-inter'>
            <div className='w-full bg-[#FAFAFA] shadow-xl flex flex-col items-center lg:items-start gap-5 lg:flex-row mt-16'>
                <div className='w-full lg:max-w-[50%] h-auto'>
                    <ReactImageGallery items={allImages}></ReactImageGallery>
                </div>
                <div className='w-full lg:max-w-[50%] h-auto flex-col px-5 py-5 box-border'>
                    <div className='w-[150px] p-2 bg-black text-center font-playfair text-white font-medium mb-5'>{category.toUpperCase()}</div>
                    <p className='text-5xl font-bold text-black font-playfair mb-5'>{productName}</p>
                    <p className='text-3xl font-bold text-black font-playfair mb-5'>৳ {price}</p>
                    <div className='w-full p-2 border border-solid border-[#38a169] bg-[#f0fff4] text-[#22543d] font-medium mb-5'>• In Stock - {availableQuantity} Units Available</div>
                    <p className='text-[#666666] text-justify mb-5'>{productDescription}</p>
                    <hr className='border-[#666666] mb-5' />
                    <div className='flex gap-20 mb-5'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>AVAILABLE QUANTITY</p>
                            <p className='text-[#666666] font-medium'>{availableQuantity} Units</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-black font-bold'>MINIMUM ORDERS</p>
                            <p className='text-[#666666] font-medium'>{minimumOrderQuantity} Units</p>
                        </div>
                    </div>
                    <hr className='border-[#666666] mb-5' />
                    <div className='flex flex-col gap-5 mb-20'>
                        <p className='font-playfair text-black font-bold text-[20px]'>Payment Options</p>
                        <div className='flex gap-5'>
                            {
                                paymentOptions.map(option => <span key={option} class="inline-flex items-center px-2 py-1 ring-1 ring-inset ring-default text-heading text-sm font-medium rounded bg-neutral-primary-soft">{option}</span>)
                            }
                        </div>
                    </div>
                    <button onClick={handleOrder} className='w-full bg-[#000000] text-[#ffffff] border-none text-[1.1rem] p-[1.2rem] cursor-pointer font-medium hover:bg-gray-800 transition-colors ease-in-out duration-500'>PLACE ORDER</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;