import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { motion, useScroll } from "framer-motion"
import TextType from '../../Components/TextType/TextType';

const Login = () => {
    const { signIn, signInWithGoogle, createUserInDb,setLoading } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [demoEmail,setDemoEmail]=useState("");
    const [demoPassword,setDemoPassword]=useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password).then((res) => {
            const user = res.user;
            // console.log(user);
            toast.success("Logged In Successfully!");
            navigate(`${location.state ? location.state : "/"}`);
            setDemoEmail("");
            setDemoPassword("");
        }).catch((error) => {
            toast.error("Wrong Credentials");
            setLoading(false);
        });
    }

    const handleGoogleLogin = () => {
        signInWithGoogle().then(async (res) => {
            if (!res)
                return;

            const loggedUser = res.user;

            await createUserInDb({
                name: loggedUser.displayName,
                email: loggedUser.email,
                role: "buyer",
                roleStatus: "approved",
                createdAt: new Date()
            });

            toast.success("Logged in with Google!");
            navigate(`${location.state ? location.state : "/"}`);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode, errorMessage);
        });
    }

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
            <div className='w-full mx-auto max-w-[1440px] h-screen'>
                <title>{`ThreadFlow | Login`}</title>
                <div className='bg-white-bg shadow-2xl p-[32px] w-full max-w-[720px] mx-auto mt-48'>
                    <div className='tf_heading font-playfair font-bold text-3xl lg:text-[40px] mb-[8px]'>
                        <TextType
                            text={"Welcome Back"}
                            typingSpeed={100}
                            pauseDuration={1500}
                            showCursor={false}
                            startOnVisible={true}
                            deletingSpeed={0}
                            loop={false}
                        /></div>
                    <form onSubmit={handleLogin}>
                        <div className='flex flex-col mb-[24px]'>
                            <label className="label mb-[8px] font-medium text-black">Email Address</label>
                            <input type="email" defaultValue={demoEmail} className="input bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="email" placeholder="Enter your Email" required />
                        </div>
                        <div className='flex flex-col mb-[8px]'>
                            <label className="label mb-[8px] font-medium text-black">Password</label>
                            <input type="password" defaultValue={demoPassword} className="input bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="password" placeholder="Enter Password" />
                        </div>
                        <p className='mb-[24px]'>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>

                        <button type="submit" className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer mb-[24px]'>
                            Login
                        </button>
                    </form>
                    <button onClick={handleGoogleLogin} className="w-full btn bg-white text-black border-[#e5e5e5] mb-[24px]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <button 
                        onClick={()=>{
                            setDemoEmail(import.meta.env.VITE_DEMO_EMAIL);
                            setDemoPassword(import.meta.env.VITE_DEMO_PASSWORD);
                        }} 
                    className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer mb-[24px]'>
                        Demo Login Credentials
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;