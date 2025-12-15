import React from 'react';
import Hero from '../../Components/Hero/Hero';
import OurProducts from '../../Components/OurProducts/OurProducts';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import Reviews from '../../Components/Reviews/Reviews';
import Stats from '../../Components/Stats/Stats';
import Partners from '../../Components/Partners/Partners';
import { motion, useScroll } from "framer-motion"

const Home = () => {
    const { scrollYProgress } = useScroll();
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#545454",
                    zIndex: 9999
                }}
            />
            <div className='flex flex-col gap-5 px-4'>
                <title>{`ThreadFlow | Home`}</title>
                <Hero></Hero>
                <OurProducts></OurProducts>
                <HowItWorks></HowItWorks>
                <Reviews></Reviews>
                <Stats></Stats>
                <Partners></Partners>
            </div>
        </>
    );
};

export default Home;