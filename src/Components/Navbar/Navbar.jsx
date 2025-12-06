import React from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router';
import './navbar.css'

const Navbar = () => {
    return (
        <div className='w-full bg-[#000000] min-h-[100px] h-auto flex justify-center items-center'>
            <nav className='w-full max-w-[1440px] flex justify-between items-center px-[24px] box-border'>
                <Link to="/"><img src={logo} alt="ThreadFlow" className='w-full max-w-[250px] h-auto cursor-pointer' /></Link>
                <div className='flex gap-[40px]'>
                    <NavLink to="/" className='text-[#ffffff] font-medium'>Home</NavLink>
                    <NavLink to="/products" className='text-[#ffffff] font-medium'>All Products</NavLink>
                    <NavLink to="/about" className='text-[#ffffff] font-medium'>About Us</NavLink>
                    <NavLink to="/contact" className='text-[#ffffff] font-medium'>Contact</NavLink>
                    <NavLink to="/login" className='text-[#ffffff] font-medium'>Login</NavLink>
                    <NavLink to="/register" className='text-[#ffffff] font-medium'>Register</NavLink>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;