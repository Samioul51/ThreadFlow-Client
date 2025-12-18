import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion, useScroll } from "framer-motion"

const About = () => {
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
            <div className='w-full max-w-[1440px] mx-auto h-auto px-4 font-inter'>
                <title>{`ThreadFlow | About Us`}</title>
                <div className='bg-[url("/about.jpg")] bg-cover bg-center bg-no-repeat w-full h-[400px] flex flex-col justify-center mb-10'>
                    <p className='about-head font-playfair font-bold text-3xl lg:text-[40px] mb-[5px] text-white text-center'>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString('About ThreadFlow')
                                    .callFunction(() => {
                                    })
                                    .start();
                            }}
                            options={{
                                delay: 80,
                                cursor: ''
                            }}
                        /></p>
                    <p className='text-[12px] px-2 lg:text-[16px] about-text text-[#666666] text-center'>Revolutionizing garment production management with innovative technology and seamless workflow solutions.</p>
                </div>
                <div className='mx-auto'>
                    <p className='tf_heading font-playfair font-bold text-xl lg:text-[40px] mb-[5px] text-black text-center'>Empowering Garment Businesses Worldwide</p>
                    <br />
                    <p className='text-[#666666] text-justify'>ThreadFlow was born from a simple vision: to transform the way garment manufacturers manage their production workflow. We understand the complexities of the garment industry, from managing multiple orders to tracking production stages, maintaining inventory, and ensuring timely delivery. Our platform is designed to address these challenges head-on, providing a comprehensive solution that streamlines every aspect of garment production management.</p>
                    <br />
                    <p className='text-[#666666] text-justify'>With years of experience in both technology and textile manufacturing, our team has developed a system that bridges the gap between traditional garment production practices and modern digital solutions. ThreadFlow combines intuitive design with powerful features, enabling small and medium-sized garment factories to compete with larger enterprises by optimizing their operations, reducing errors, and improving overall efficiency.</p>
                    <br />
                    <p className='text-[#666666] text-justify'>Our commitment goes beyond just providing software. We're dedicated to building long-term partnerships with our clients, offering continuous support, regular updates, and new features that evolve with the changing needs of the industry. Whether you're managing a boutique production facility or a growing manufacturing business, ThreadFlow scales with your needs, providing real-time insights, automated tracking, and comprehensive reporting tools that empower you to make informed decisions and drive your business forward.</p>
                    <br />
                    <p className='text-[#666666] text-justify'>Join hundreds of garment manufacturers who have already transformed their operations with ThreadFlow. Experience the difference that smart technology and thoughtful design can make in your production workflow. Together, we're building the future of garment manufacturing—one order, one production stage, one successful delivery at a time.</p>
                </div>
            </div>
        </>
    );
};

export default About;