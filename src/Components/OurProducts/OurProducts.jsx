import React, { use } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const OurProducts = ({productPromise}) => {

    const result=use(productPromise);
    const data=result.data;
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>Our Products</p>
            <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4 auto-rows-fr'>
                {
                    data.slice(0,6).map(product=><ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default OurProducts;