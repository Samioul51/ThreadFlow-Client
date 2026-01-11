import React, { use } from 'react';
import { motion, useScroll } from "framer-motion"
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';


const ProfileDashboard = () => {
    const { user, userData } = use(AuthContext);
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
            <div className='py-5 px-3 mx-5 mt-5 flex flex-col items-center bg-white-bg font-inter'>
                <title>{`ThreadFlow | My Dashboard`}</title>
                <p className='tf_heading font-playfair text-black text-3xl font-bold text-center mb-5'>MY DASHBOARD</p>
            </div>
        </>
    );
};

export default ProfileDashboard;