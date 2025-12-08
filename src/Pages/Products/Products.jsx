import React, { use, useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { IoIosArrowDropdown } from 'react-icons/io';

const productPromise = fetch("http://localhost:3000/products").then(res => res.json());

const Products = () => {
    const result = use(productPromise);
    const products = result.data;

    console.log(products);

    const categories = ["All", "Shirt", "Pant", "Jacket", "Accessories"];

    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");

    const data = products.filter(p => {
        const matchCategory = category === "All" ? true : p.category === category;
        const matchTitle = p.productName.toLowerCase().includes(searchTitle.toLowerCase());
        return matchCategory && matchTitle;
    });

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10 mt-16'>
            <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>All Products</p>
            <div className='w-full max-w-full p-[16px] box-border flex justify-between items-center'>
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">{category} <IoIosArrowDropdown /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            categories.map(c => <li key={c}><a onClick={() => setCategory(c)}>{c}</a></li>)
                        }
                    </ul>
                </div>
                <input type="text" placeholder="Search by Title" className="input input-primary" onChange={(e) => setSearchTitle(e.target.value)} />
            </div>
            {
                data.length > 0 ? (
                    <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4 auto-rows-fr'>
                        {
                            data.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                        }
                    </div>
                )
                    :
                    (
                        <div className='w-full max-w-[1440px] flex justify-center items-center h-[50vh]'>
                            <p className='font-playfair text-2xl text-center font-bold text-black'>NO PRODUCT FOUND!</p>
                        </div>
                        
                    )

            }
            <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4 auto-rows-fr'>
                {
                    data.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;