import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import toast from 'react-hot-toast';
import TextType from '../TextType/TextType';
import AnimatedContent from '../AnimatedContent/AnimatedContent';

const OurProducts = () => {
    const [homeProducts, setHomeProducts] = useState([]);

    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products/home");
                const data = await response.json();
                setHomeProducts(data.data);
            } catch (error) {
                toast.error("Failed to load home products!");
            }
        };
        fetchHomeProducts();
    }, [])

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>
                <TextType
                    text={"Our Products"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
            </p>
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
                startOnVisible={true}
                >
                <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4 auto-rows-fr'>
                    {
                        homeProducts.slice(0, 6).map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                    }
                </div>
            </AnimatedContent>
        </div>
    );
};

export default OurProducts;