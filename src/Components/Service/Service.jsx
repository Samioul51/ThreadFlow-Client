import React from 'react';
import AnimatedContent from '../AnimatedContent/AnimatedContent';

const Service = ({service}) => {
    const {title,description}=service;
    return (
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
        <div className='w-full flex flex-col justify-center items-center bg-fafafa-bg p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
            <p className='text-[1.3rem] mb-[1rem] text-black font-playfair font-bold'>{title}</p>
            <p className='text-[#666]'>{description}</p>
        </div>
        </AnimatedContent>
    );
};

export default Service;