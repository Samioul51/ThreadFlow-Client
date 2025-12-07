import React from 'react';
import Hero from '../../Components/Hero/Hero';
import OurProducts from '../../Components/OurProducts/OurProducts';

const productPromise=fetch("https://jsonplaceholder.typicode.com/users").then(res=>res.json());

const Home = () => {
    return (
        <div className='flex flex-col gap-5 px-4'>
            <Hero></Hero>
            <OurProducts productPromise={productPromise}></OurProducts>
        </div>
    );
};

export default Home;