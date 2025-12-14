import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminAllProducts = () => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [users, setUsers] = useState([]);

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

    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        document.getElementById("delete_product_modal").showModal();
    }
    const handleCloseDeleteModal = () => {
        document.getElementById("delete_product_modal").close();
        setSelectedProduct(null);
    }

    const handleProductDelete =async (e) => {
        e.preventDefault();
        // console.log("delete triggered");

        if(!selectedProduct)
            return;

        const response=await fetch(`http://localhost:3000/products/${selectedProduct._id}`,{
            method:"DELETE"
        });

        if(!response.ok)
            throw new Error("Failed to delete product!");

        await response.json();

        const remaining=products.filter(product=>product._id!==selectedProduct._id);
        setProducts(remaining);

        toast.success("Product deleted successfully!");
        handleCloseDeleteModal();
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

    const handleProductUpdate = (e) => {
        e.preventDefault();
        console.log("update triggered");
        handleCloseUpdateModal();
        setSelectedProduct(null);  
    }

    // console.log(products);
    // console.log(users);

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
                                                    users.find(u => u.email === product?.email)?.name.toUpperCase() || "UNKNOWN"
                                                }
                                            </td>
                                            <td className='text-center'>
                                                <input type="checkbox" defaultChecked className="checkbox checkbox-neutral" />
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button onClick={() => handleOpenUpdateModal(product)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    UPDATE
                                                </button>
                                                <button onClick={() => handleOpenDeleteModal(product)} className="w-full btn btn-error">DELETE</button>
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

            <dialog id="delete_product_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to delete product?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleProductDelete} className="btn">Yes</button>
                            <button onClick={handleCloseDeleteModal} className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Modal for update */}
            <dialog id="update_product_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg">Update Product</h3>
                    <form onSubmit={handleProductUpdate}>
                        {/* Product Name */}
                        <div className="mt-3">
                            <label className="font-medium">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                defaultValue={selectedProduct?.productName}
                                readOnly
                                className="input w-full bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        
                        {/* Product Description */}
                        <div className="mt-3">
                            <label className="font-medium">Product Description</label>
                            <textarea
                                name="productDescription"
                                defaultValue={selectedProduct?.productDescription}
                                className="textarea textarea-lg w-full bg-[#fafafa] resize-none"
                            ></textarea>
                        </div>
                        
                        {/* Price */}
                        <div className="mt-3">
                            <label className="font-medium">Price (BDT)</label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedProduct?.price}
                                className="input w-full bg-[#fafafa]"
                            />
                        </div>

                        {/* Category */}
                        <div className="mt-3">
                            <label className="font-medium">Category</label>
                            <input
                                type="text"
                                name="category"
                                defaultValue={selectedProduct?.category}
                                readOnly
                                className="input w-full bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Image Preview (Read Only) */}
                        <div className="mt-4">
                            <label className="font-medium">Images</label>
                            <div className="grid grid-cols-3 gap-3 mt-2">
                                {selectedProduct?.images?.map((img, i) => (
                                    <div
                                        key={i}
                                        className="w-full h-24 border rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">(Images cannot be changed)</p>
                        </div>

                        {/* Payment Options */}
                        <div className="mt-3">
                            <label className="font-medium">Payment Option</label>
                            <select
                                name="paymentOptions"
                                value={selectedProduct?.paymentOptions || ""}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        paymentOptions: e.target.value
                                    })
                                }
                                className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300w-full bg-[#fafafa]"
                            >
                                <option value="Stripe">Stripe</option>
                                <option value="Cash on Delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn">
                                Update
                            </button>
                            <button className="btn" onClick={handleCloseUpdateModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AdminAllProducts;