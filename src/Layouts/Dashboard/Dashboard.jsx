import React, { use } from 'react';
import { NavLink, Outlet } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { TbShoppingBagCheck } from "react-icons/tb";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { MdWork } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";


const Dashboard = () => {
    const { user, userData } = use(AuthContext);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden">
                        {/* icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            className="size-6">
                            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </label>
                    <div className="px-4 font-playfair font-bold">My Dashboard</div>
                </nav>

                <div className="p-4 bg-[#fafafa]">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <ul className="bg-black menu p-4 w-64 min-h-full bg-base-200">
                    <li>
                        <NavLink to="/dashboard/profile" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                            <CgProfile /> My Profile
                        </NavLink>
                    </li>
                    {
                        userData?.role === "buyer" && <li>
                            <NavLink to="/dashboard/my-orders" className={({ isActive }) => `font-playfair font-bold text-white text-[16px] ${isActive ? "bg-[#99a1af]" : "hover:bg-gray-400"} transition-colors ease-in-out duration-500`}>
                                <TbShoppingBagCheck /> My Orders
                            </NavLink>
                        </li>
                    }

                    {
                        (userData?.role==="manager" && userData?.roleStatus!=="pending") && <>
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