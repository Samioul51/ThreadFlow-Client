import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';


const ManageProducts = () => {

    const { user } = use(AuthContext);
    const [myProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();

    const [id, setID] = useState("");
    const handleOpenModal = (orderID) => {
        setID(orderID);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setID("");
    }

    const handleProductUpdate = () => {

    }

    const handleProductDelete = async () => {
        if(!id)
            return;
        const response=await fetch(`http://localhost:3000/products/${id}`,{
            method:"DELETE"
        });

        if(!response.ok)
            throw new Error("Failed to delete product!");

        await response.json();
        const remaining=myProducts.filter(product=>product._id!==id);
        setMyProducts(remaining);
        toast.success("Product deleted successfully");
        handleCloseModal();
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                const products = data.data.filter(product => product.email === user.email);
                setMyProducts(products);
            } catch (error) {
                toast.error("Failed to load products!");
            }
        }

        fetchProducts();
    }, [user.email]);

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>MY PRODUCTS</p>
            {
                myProducts.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table class="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>PRODUCT ID</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT IMAGE</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT NAME</th>
                                    <th className='text-black font-bold font-playfair'>PRICE</th>
                                    <th className='text-black font-bold font-playfair'>PAYMENT MODE</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    myProducts.map(product => (
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
                                                {product.price}
                                            </td>
                                            <td>
                                                {product.paymentOptions.toUpperCase()}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button onClick={handleProductUpdate} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    UPDATE
                                                </button>
                                                <button onClick={()=>handleOpenModal(product._id)} className="w-full btn btn-error">DELETE</button>

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
            {/* Modal for deletion */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to delete product?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleProductDelete} className="btn">Yes</button>
                            <button onClick={handleCloseModal} className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageProducts;