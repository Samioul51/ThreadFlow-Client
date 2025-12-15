import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../../assets/brand1.png';
import brand2 from '../../assets/brand2.png';
import brand3 from '../../assets/brand3.png';
import brand4 from '../../assets/brand4.png';
import brand5 from '../../assets/brand5.png';

const Partners = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>Our Partners</p>
            <Marquee 
                pauseOnHover={true}
                pauseOnClick={true}
                speed={130}>
                <img src={brand1} className='w-[300px] h-[300px]'/>
                <img src={brand2} className='w-[300px] h-[300px]'/>
                <img src={brand3} className='w-[300px] h-[300px]'/>
                <img src={brand4} className='w-[300px] h-[300px]'/>
                <img src={brand5} className='w-[300px] h-[300px]'/>
            </Marquee>
        </div>
    );
};

export default Partners;