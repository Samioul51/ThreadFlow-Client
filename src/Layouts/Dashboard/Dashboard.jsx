import React, { use, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { TbShoppingBagCheck } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { MdWork } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png"

const Dashboard = () => {
    const { user, userData } = use(AuthContext);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light")
    }, [darkMode]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark")
            document.documentElement.classList.add("dark");
        else
            document.documentElement.classList.remove("dark");
    }, []);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-black flex items-center justify-between sticky top-0 z-51 px-4 py-5">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden">
                        {/* icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            className="size-6 text-white">
                            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </label>
                    <div className="px-4 font-playfair font-bold text-white"></div>
                    <div className='flex gap-5 items-center'>
                        <div className='flex gap-2 items-center'>
                            <img src={user.photoURL} className="w-[40px] h-[40px] rounded-[50%]" />
                            <div className='flex flex-col justify-between'>
                                <p className='font-medium text-sm font-playfair' style={{color:"#FFFFFF"}}>{userData?.name}</p>
                                <p className='text-[12px] font-playfair' style={{color:"#FFFFFF"}}>{user.email}</p>
                            </div>
                        </div>
                        
                        <label className="swap swap-rotate">

                            <input type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                                className="theme-controller"
                            />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>

                </nav>

                <div className="p-4 bg-fafafa-bg">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <ul className="bg-black menu p-4 w-64 min-h-full">
                    <li>
                        <NavLink to="/"><img src={logo} alt="ThreadFlow" className='w-full max-w-[200px] h-auto cursor-pointer' /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-dashboard" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                            <TbLayoutDashboard /> My Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                            <CgProfile /> My Profile
                        </NavLink>
                    </li>

                    {/* User Specific */}

                    {
                        (userData?.role === "buyer" && userData?.roleStatus !== "pending") && <li>
                            <NavLink to="/dashboard/my-orders" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                <TbShoppingBagCheck /> My Orders
                            </NavLink>
                        </li>
                    }

                    {/* Manager Specific */}

                    {
                        (userData?.role === "manager" && userData?.roleStatus !== "pending") && <>
                            <li>
                                <NavLink to="/dashboard/add-product" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <RiAddCircleFill />Add Product
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-products" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <AiFillProduct />My Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-orders" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <MdWork /> Pending Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approved-orders" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <IoCheckmarkDoneCircle /> Approved Orders
                                </NavLink>
                            </li>
                        </>
                    }

                    {/* Admin Specific */}

                    {
                        (userData?.role === "admin") && <>
                            <li>
                                <NavLink to="/dashboard/manage-users" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <FaUser /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-products" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <AiFillProduct /> All Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-orders" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                    <MdWork /> All Orders
                                </NavLink>
                            </li>
                        </>
                    }

                    <li>
                        <NavLink to="/" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                            <IoReturnUpBackOutline /> Back to Home
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;