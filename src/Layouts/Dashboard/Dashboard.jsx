import React, { use } from 'react';
import { NavLink, Outlet } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { TbShoppingBagCheck } from "react-icons/tb";
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
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-black">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden">
                        {/* icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            className="size-6 text-white">
                            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </label>
                    <div className="px-4 font-playfair font-bold text-white">My Dashboard</div>
                </nav>

                <div className="p-4 bg-[#fafafa]">
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