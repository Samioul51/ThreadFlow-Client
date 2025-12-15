import React, { use, useEffect, useState } from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router';
import './navbar.css'
import { HiMenu, HiX } from 'react-icons/hi';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const navOptions = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "logout" }
    ]

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light")
    }, [darkMode]);

    const handleOpenModal = () => document.getElementById("my_modal_5").showModal();
    const handleCloseModal = () => document.getElementById("my_modal_5").close();


    const handleLogout = () => {
        logout().then(() => {
            toast.success("Logged out successfully!");
            handleCloseModal();
        }).catch((error) => {
            toast.error(error.message);
            handleCloseModal();
        })
    }

    return (
        <div className='w-full bg-[#000000] min-h-[100px] h-auto flex justify-center items-center sticky top-0 z-50'>
            <nav className='w-full max-w-[1440px] flex justify-between items-center px-[24px] box-border'>
                <Link to="/"><img src={logo} alt="ThreadFlow" className='w-full max-w-[200px] h-auto cursor-pointer' /></Link>

                {/* Desktop */}
                <div className='hidden lg:flex items-center gap-[40px]'>
                    {
                        navOptions.slice(0, 2).map(option => (
                            <NavLink key={option.name} to={option.path} className='text-[#ffffff] font-medium'>{option.name}</NavLink>
                        ))
                    }
                    {
                        user ? (
                            <>
                                <NavLink to="/dashboard" className='text-[#ffffff] font-medium'>Dashboard</NavLink>
                                <img src={user.photoURL} className="w-[40px] h-[40px] rounded-[50%]" />
                                <button className='text-black bg-white rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer' onClick={handleOpenModal}>Logout</button>
                            </>
                        ) : (
                            <>
                                {
                                    navOptions.slice(2, 5).map(option => (
                                        <NavLink key={option.name} to={option.path} className='text-[#ffffff] font-medium'>{option.name}</NavLink>
                                    ))}
                                <button className='text-black bg-white rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer' onClick={() => navigate("/register")}>Register</button>
                            </>
                        )
                    }
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

                {/* Small Device Menu */}

                <div className='lg:hidden flex items-center'>
                    <button onClick={toggleMenu}>
                        {
                            isOpen ? <HiX size={30} className='text-white'></HiX>
                                :
                                <HiMenu size={30} className='text-white'></HiMenu>
                        }
                    </button>
                </div>

                {/* Mobile Menu */}

                <div className={`absolute top-[100px] left-0 w-full bg-black flex flex-col items-center py-[24px] lg:hidden gap-[24px] z-50 transform transition-all duration-300 ease-in-out
                        ${isOpen ? "translate-y-0 opacity-100 max-h-[500px]" : "-translate-y-10 opacity-0 max-h-0 overflow-hidden"}`}>
                    {
                        navOptions.slice(0, 2).map(option => (
                            <NavLink key={option.name} to={option.path} className='text-[#ffffff] font-medium'>{option.name}</NavLink>
                        ))
                    }
                    {
                        user ? (
                            <>
                                <NavLink to="/dashboard" className='text-[#ffffff] font-medium'>Dashboard</NavLink>
                                <img src={user.photoURL} className="w-[40px] h-[40px] rounded-[50%]" />
                                <button className='text-black bg-white rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer' onClick={handleOpenModal}>Logout</button>
                            </>
                        ) : (
                            <>
                                {
                                    navOptions.slice(2, 5).map(option => (
                                        <NavLink key={option.name} to={option.path} className='text-[#ffffff] font-medium'>{option.name}</NavLink>
                                    ))}
                                <button className='text-black bg-white rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer' onClick={() => navigate("/register")}>Register</button>
                            </>
                        )
                    }
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
            </nav >
            {/* Modal for logout */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4 text-black">Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleLogout} className="btn text-black mr-2">Yes</button>
                            <button onClick={handleCloseModal} className="btn text-black">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default Navbar;