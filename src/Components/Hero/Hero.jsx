import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './hero.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import { useNavigate } from 'react-router';

const Hero = () => {
    const navigate=useNavigate();
    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto px-4 mb-10'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                <SwiperSlide className="bg-[#1a1a1a] flex flex-col lg:flex-row gap-5 h-full pb-5">
                    <div className="flex flex-col justify-center items-start gap-6 px-6 px-12 lg:px-16 w-full max-w-[459px] lg:max-w-1/2">
                        <h2 className="font-playfair text-white text-4xl md:text-5xl lg:text-6xl leading-snug text-left">
                            Streamline your Garment Production
                        </h2>
                        <p className="hero-text text-[#d4d4d4] text-base md:text-lg lg:text-xl leading-relaxed max-w-prose text-left">
                            Manage orders, track production stages, and ensure timely delivery with our comprehensive production tracker system. Built for efficiency, designed for growth.
                        </p>
                        <button className='text-black bg-white rounded-[2px] font-medium w-[200px] h-[60px] cursor-pointer' onClick={()=>navigate("/products")}>View Products</button>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center px-6 lg:px-0 lg:items-center">
                        <img
                            src={banner1}
                            alt="Garment Production"
                            className="w-full max-h-[400px] lg:h-full object-cover"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide className="bg-[#1a1a1a] flex flex-col lg:flex-row gap-5 h-full pb-5">
                    <div className="flex flex-col justify-center items-start gap-6 px-6 px-12 lg:px-16 w-full max-w-[459px] lg:max-w-1/2">
                        <h2 className="font-playfair text-white text-4xl md:text-5xl lg:text-6xl leading-snug text-left">
                            Real-Time Production Tracking
                        </h2>
                        <p className="hero-text text-[#d4d4d4] text-base md:text-lg lg:text-xl leading-relaxed max-w-prose text-left">
                            Monitor every stage of your garment production from cutting to finishing. Get instant updates and ensure quality control at every step.
                        </p>
                        <button className='text-black bg-white rounded-[2px] font-medium w-[200px] h-[60px] cursor-pointer' onClick={()=>navigate("/register")}>Register Now</button>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center px-6 lg:px-0 lg:items-center">
                        <img
                            src={banner2}
                            alt="Garment Production"
                            className="w-full max-h-[400px] lg:h-full object-cover"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide className="bg-[#1a1a1a] flex flex-col lg:flex-row gap-5 h-full pb-5">
                    <div className="flex flex-col justify-center items-start gap-6 px-6 px-12 lg:px-16 w-full max-w-[459px] lg:max-w-1/2">
                        <h2 className="font-playfair text-white text-4xl md:text-5xl lg:text-6xl leading-snug text-left">
                            Easy Stock Management
                        </h2>
                        <p className="hero-text text-[#d4d4d4] text-base md:text-lg lg:text-xl leading-relaxed max-w-prose text-left">
                            Keep track of your raw materials, work-in-progress, and finished goods with real-time visibility. Optimize your inventory levels, reduce waste, and improve overall production efficiency.
                        </p>
                        <button className='text-black bg-white rounded-[2px] font-medium w-[200px] h-[60px] cursor-pointer' onClick={()=>navigate("/contact")}>Leave a message</button>
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center px-6 lg:px-0 lg:items-center">
                        <img
                            src={banner3}
                            alt="Garment Production"
                            className="w-full max-h-[400px] lg:h-full object-cover"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
};

export default Hero;