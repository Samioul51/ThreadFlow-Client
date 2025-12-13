import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminAllProducts = () => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [users,setUsers]=useState([]);
    const [id, setID] = useState("");

    // Products data

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                const allProducts = data.data;
                setProducts(allProducts);
            } catch (error) {
                toast.error("Failed to load products!");
            }
        }
        fetchProducts();
    }, []);

    // Users Data

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/users");
                const data = await response.json();
                const allUsers = data.data;
                setUsers(allUsers);
            } catch (error) {
                toast.error("Failed to load Users!");
            }
        }

        fetchUsers();
    }, []);

    // For deletion

    const handleOpenModal = (orderID) => {
        setID(orderID);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setID("");
    }

    // For Update

    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        document.getElementById("update_product_modal").showModal();
    }

    const handleCloseUpdateModal = () => {
        document.getElementById("update_product_modal").close();
        setSelectedProduct(null);
    }

    console.log(products);
    console.log(users);

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>ALL PRODUCTS</p>
            {
                products.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>PRODUCT ID</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT IMAGE</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT NAME</th>
                                    <th className='text-black font-bold font-playfair'>CATEGORY</th>
                                    <th className='text-black font-bold font-playfair'>PRICE</th>
                                    <th className='text-black font-bold font-playfair'>CREATED BY</th>
                                    <th className='text-black font-bold font-playfair'>SHOW ON HOMEPAGE</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>
                                                {product._id}
                                            </td>
                                            <td>
                                                <img className='w-full max-w-[50px] mx-auto h-auto border-black border' src={product.images[0]} />
                                            </td>
                                            <td>
                                                {product.productName.toUpperCase()}
                                            </td>
                                            <td>
                                                {product.category.toUpperCase()}
                                            </td>
                                            <td>
                                                {product.price}
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    users.find(u=>u.email===product?.email)?.name.toUpperCase() || "UNKNOWN"
                                                }
                                            </td>
                                            <td className='text-center'>
                                                <input type="checkbox" defaultChecked className="checkbox checkbox-neutral" />
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button onClick={() => handleOpenUpdateModal(product)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    UPDATE
                                                </button>
                                                <button onClick={() => handleOpenModal(product._id)} className="w-full btn btn-error">DELETE</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO PRODUCTS FOUND!</p>
                    </div>
            }
        </div>
    );
};

export default AdminAllProducts;