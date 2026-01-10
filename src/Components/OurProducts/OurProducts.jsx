import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import toast from 'react-hot-toast';
import TextType from '../TextType/TextType';
import AnimatedContent from '../AnimatedContent/AnimatedContent';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const OurProducts = () => {
    const [homeProducts, setHomeProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHomeProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://thread-flow-server51.vercel.app/products/home");
                const data = await response.json();
                setHomeProducts(data.data);
            } catch (error) {
                // toast.error("Failed to load home products!");
            }
            setLoading(false);
        };
        fetchHomeProducts();
    }, [])

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10'>
            <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
                <TextType
                    text={"Our Products"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
            </div>
            {
                loading ?

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 gap-4 auto-rows-fr'>
                        {
                            Array.from({ length: 8 }).map((_, index) => (
                                <CardSkeleton key={index}></CardSkeleton>
                            ))
                        }
                    </div>

                    :
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
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 gap-4 auto-rows-fr'>
                            {
                                homeProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            }
                        </div>
                    </AnimatedContent>
            }
        </div>
    );
};

export default OurProducts;