import React from 'react';
import toast from 'react-hot-toast';
import { motion, useScroll } from "framer-motion"
import TextType from '../../Components/TextType/TextType';

const Contact = () => {
    const { scrollYProgress } = useScroll();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;

        const fields = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            sent: new Date()
        };

        const res = await fetch("https://thread-flow-server51.vercel.app/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        });

        if (res.ok) {
            toast.success("Message sent successfully!");
            form.reset();
        }
        else
            toast.error("Failed to send message. Try again later.");
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
            <div className='w-full max-w-[1440px] mx-auto h-auto mb-10 mt-16'>
                <title>{`ThreadFlow | Contact Us`}</title>
                <div className='tf_heading font-playfair text-black text-3xl lg:text-[40px] font-bold text-center mb-10'>
                    <TextType
                    text={"Leave a Message For Us"}
                    typingSpeed={100}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
                    
                </div>
                <form onSubmit={handleSendMessage} className=' bg-white-bg shadow-2xl p-[64px]  w-full max-w-[720px] mx-auto '>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Your Name</label>
                        <input type="text" className="input bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Your Email</label>
                        <input type="email" className="input bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="email" placeholder="Enter your Email" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Subject</label>
                        <input type="text" className="input bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="subject" placeholder="Subject" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Message</label>
                        <textarea name="message" class="textarea bg-fafafa-bg px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 resize-none h-[200px]" placeholder="Message" required></textarea>
                    </div>

                    <button type="submit" className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer mb-[24px]'>
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default Contact;