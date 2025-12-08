import React from 'react';
import Hero from '../../Components/Hero/Hero';
import OurProducts from '../../Components/OurProducts/OurProducts';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import Reviews from '../../Components/Reviews/Reviews';
import Stats from '../../Components/Stats/Stats';
import Partners from '../../Components/Partners/Partners';

const productPromise=fetch("http://localhost:3000/products").then(res=>res.json());

const Home = () => {
    return (
        <div className='flex flex-col gap-5 px-4'>
            <Hero></Hero>
            <OurProducts productPromise={productPromise}></OurProducts>
            <HowItWorks></HowItWorks>
            <Reviews></Reviews>
            <Stats></Stats>
            <Partners></Partners>
        </div>
    );
};

export default Home;