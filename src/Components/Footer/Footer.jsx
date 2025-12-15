import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/logo.png'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div className="foot bg-black">
            <div className="px-4 pt-12 mx-auto max-w-lg lg:max-w-[1440px] lg:px-8">
                <div className="w-full max-w-full flex flex-col lg:flex-row lg:justify-between gap-5 mb-8 items-start">
                    <div className="max-w-md lg:col-span-2">
                        <Link
                            to="/"
                            aria-label="Go home"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <img src={logo} alt="ThreadFlow" className='w-full max-w-[200px] h-auto cursor-pointer' />
                        </Link>
                        <div className="mt-4 lg:max-w-sm">
                            <p className="text-[16px] text-[#666666] text-justify">
                                Your trusted partner in garment production management. Streamlining workflows and ensuring quality delivery since 2025.
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="font-playfair font-semibold tracking-wide text-white text-[19px]">
                            Quick Links
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-[#666666] text-[16px]"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="text-[#666666] text-[16px]"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-[#666666] text-[16px]"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-[#666666] text-[16px]"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-playfair font-semibold tracking-wide text-white text-[19px]">
                            Support
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <Link
                                    to="#"
                                    className="text-[#666666] text-[16px]"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-[#666666] text-[16px]"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-[#666666] text-[16px]"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="text-[#666666] text-[16px]"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-playfair font-semibold tracking-wide text-white text-[19px]">
                            Connect
                        </p>
                        <ul className="mt-2 space-y-2">
                            <li className='w-full'>
                                <Link
                                    to="https://www.linkedin.com/in/a-k-m-samioul-islam/"
                                    className="flex  items-center gap-[10px] text-[#666666] text-[16px]"
                                    target='_blank'
                                >
                                    <FaLinkedin /> LinkedIn
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="flex  items-center gap-[10px] text-[#666666] text-[16px]"
                                >
                                    <FaSquareXTwitter /> X
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="flex  items-center gap-[10px] text-[#666666] text-[16px]"
                                >
                                    <FaFacebookSquare /> Facebook
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="flex  items-center gap-[10px] text-[#666666] text-[16px]"
                                >
                                    <FaInstagramSquare /> Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row mx-10">
                <p className="text-center text-sm text-gray-100">
                    © 2025 ThreadFlow. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;