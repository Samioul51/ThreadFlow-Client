import React from 'react';
import TextType from '../TextType/TextType';
import AnimatedContent from '../AnimatedContent/AnimatedContent';

const Stats = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
                <TextType
                    text={"Statistics"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 px-4 gap-4 auto-rows-fr'>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    ease="power3.out"
                    disappearEase="power3.in"
                    initialOpacity={0}
                    animateOpacity={true}
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                    startOnVisible={true}>
                    <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                        <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>5000+</p>
                        <p className='text-[#666]'>Orders Delivered</p>
                    </div>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    ease="power3.out"
                    disappearEase="power3.in"
                    initialOpacity={0}
                    animateOpacity={true}
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                    startOnVisible={true}>
                    <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                        <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>500+</p>
                        <p className='text-[#666]'>Happy Clients</p>
                    </div>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    ease="power3.out"
                    disappearEase="power3.in"
                    initialOpacity={0}
                    animateOpacity={true}
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                    startOnVisible={true}>
                    <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                        <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>98%</p>
                        <p className='text-[#666]'>On-Time Delivery</p>
                    </div>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    ease="power3.out"
                    disappearEase="power3.in"
                    initialOpacity={0}
                    animateOpacity={true}
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                    startOnVisible={true}>
                    <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                        <p className='text-[3rem] mb-[1rem] text-black font-playfair font-bold'>24/7</p>
                        <p className='text-[#666]'>Support Available</p>
                    </div>
                </AnimatedContent>
            </div>
        </div>
    );
};

export default Stats;