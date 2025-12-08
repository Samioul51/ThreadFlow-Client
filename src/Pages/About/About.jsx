import React from 'react';

const About = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto px-4 mb-10 font-inter'>
            <div className='bg-[url(../../src/assets/about.jpg)] bg-cover bg-center bg-no-repeat w-full h-[400px] flex flex-col justify-center'>
                <p className='font-playfair font-bold text-[40px] mb-[5px] text-white text-center'>About ThreadFlow</p>
                <p className='text-[#666666] text-center'>Revolutionizing garment production management with innovative technology and seamless workflow solutions.</p>
            </div>
        </div>
    );
};

export default About;