import React, { use, useState } from 'react';
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
    const navOptions = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Login", path: "/login" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "logout" }
    ]

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
        <div className='w-full bg-[#000000] min-h-[100px] h-auto flex justify-center items-center sticky top-0 z-999'>
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
                        navOptions.slice(0, 4).map(option => (
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
                                    navOptions.slice(4, 5).map(option => (
                                        <NavLink key={option.name} to={option.path} className='text-[#ffffff] font-medium'>{option.name}</NavLink>
                                    ))}
                                <button className='text-black bg-white rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer' onClick={() => navigate("/register")}>Register</button>
                            </>
                        )
                    }
                </div>
            </nav >
            {/* Modal for logout */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleLogout} className="btn">Yes</button>
                            <button onClick={handleCloseModal} className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default Navbar;