import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { IoIosArrowDropdown } from 'react-icons/io';
import { motion, useScroll } from "framer-motion"
import TextType from '../../Components/TextType/TextType';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");
    const { scrollYProgress } = useScroll();
    const limit = 9;

    useEffect(() => {
        const skip = (page - 1) * limit;

        const params = new URLSearchParams({
            limit: limit.toString(),
            skip: skip.toString()
        });

        if (category !== "All")
            params.append("category", category);

        if (searchTitle)
            params.append("search", searchTitle);

        fetch(`http://localhost:3000/products?${params}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
                setTotal(data.total);
            });
    }, [page, category, searchTitle]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
        setPage(1);
    };

    const categories = ["All", "Shirt", "Pant", "Jacket", "Accessories"];

    const totalPages = Math.ceil(total / limit);

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
                <title>{`ThreadFlow | All Products`}</title>
                <p className='font-playfair text-black text-5xl font-bold text-center mb-10'>
                    <TextType
                    text={"All Products"}
                    typingSpeed={100}
                    pauseDuration={1500}
                    showCursor={false}
                    startOnVisible={true}
                    deletingSpeed={0}
                    loop={false}
                />
                </p>
                <div className='w-full max-w-full p-[16px] box-border flex justify-between items-center'>
                    <div className="dropdown dropdown-start">
                        <div tabIndex={0} role="button" className="btn m-1">{category} <IoIosArrowDropdown /></div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {
                                categories.map(c => <li key={c}><a onClick={() => handleCategoryChange(c)}>{c}</a></li>)
                            }
                        </ul>
                    </div>
                    <input type="text" placeholder="Search by Title" className="input input-primary" onChange={handleSearchChange} />
                </div>
                {
                    products.length > 0 ? (
                        <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4 auto-rows-fr'>
                            {
                                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
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

                {/* Pagination */}
                {
                    totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                className="btn btn-sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages).keys()].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num + 1)}
                                    className={`btn btn-sm ${page === num + 1 ? "btn-active" : ""}`}
                                >
                                    {num + 1}
                                </button>
                            ))}

                            <button
                                className="btn btn-sm"
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Products;