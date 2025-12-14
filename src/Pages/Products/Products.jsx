import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { IoIosArrowDropdown } from 'react-icons/io';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 9;

    useEffect(() => {
        const skip = (page - 1) * limit;

        fetch(`http://localhost:3000/products?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
                setTotal(data.total);
            });
    }, [page])
    // console.log(products);

    const categories = ["All", "Shirt", "Pant", "Jacket", "Accessories"];

    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");

    const data = products.filter(p => {
        const matchCategory = category === "All" ? true : p.category === category;
        const matchTitle = p.productName.toLowerCase().includes(searchTitle.toLowerCase());
        return matchCategory && matchTitle;
    });

    const totalPages = Math.ceil(total / limit);

    return (
        <div className='w-full max-w-[1440px] mx-auto h-auto mb-10 mt-16'>
            <title>{`ThreadFlow | All Products`}</title>
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
    );
};

export default Products;