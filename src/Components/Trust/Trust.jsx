import React from 'react';
import TextType from '../TextType/TextType';
import LightPillar from './LightPiller/LightPillar';
import BlurText from '../BlurText/BlurText';

const Trust = () => {
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
                <TextType
                    text={"Why ThreadFlow"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
            </div>
            <div style={{ width: '100%', height: '500px', position: 'relative' }}>
                <LightPillar
                    mixBlendMode="normal"
                    topColor="#000000"
                    bottomColor="#99a1af"
                />
                <div className='absolute inset-0 z-50 flex justify-center items-center px-8 md:px-16'>
                    <div className='font-playfair font-medium text-justify text-base md:text-lg lg:text-xl'> 
                        <BlurText
                            text={"ThreadFlow has been the trusted partner for over 500+ garment factories and buyers worldwide. We understand that in the garment industry, timely delivery and quality assurance are everything. That's why our platform provides complete transparency at every production stage, ensuring you're never left in the dark. With secure payment processing, real-time order tracking, and 24/7 system reliability, we've helped businesses reduce delivery delays by 40% and improve customer satisfaction significantly. Your trust is our priority—every order, every time."}
                            delay={150}
                            animateBy="words"
                            direction="top"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trust;