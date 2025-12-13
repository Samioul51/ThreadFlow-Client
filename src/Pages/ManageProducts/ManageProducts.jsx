import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { IoIosArrowDropdown } from 'react-icons/io';


const ManageProducts = () => {

    const { user, userData } = use(AuthContext);
    const [myProducts, setMyProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [id, setID] = useState("");

    const categories = ["All", "Shirt", "Pant", "Jacket", "Accessories"];

    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");

    const filteredProducts = myProducts.filter(p => {
        const matchCategory = category === "All" ? true : p.category.toLowerCase() === category.toLowerCase();
        const matchTitle = p.productName.toLowerCase().includes(searchTitle.toLowerCase());
        return matchCategory && matchTitle;
    });

    // For deletion

    const handleOpenModal = (orderID) => {
        setID(orderID);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setID("");
    }

    const handleProductDelete = async () => {
        if (!id)
            return;
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok)
            throw new Error("Failed to delete product!");

        await response.json();
        const remaining = myProducts.filter(product => product._id !== id);
        setMyProducts(remaining);
        toast.success("Product deleted successfully");
        handleCloseModal();
    }

    // For update

    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        document.getElementById("update_product_modal").showModal();
    }

    const handleCloseUpdateModal = () => {
        document.getElementById("update_product_modal").close();
        setSelectedProduct(null);
    }

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        if (!selectedProduct)
            return;

        const form = e.target;

        const price = parseInt(form.price.value);
        const newStock = parseInt(form.addStock.value) || 0;
        const minOrder = form.minimumOrderQuantity.value;
        const paymentOptions = form.paymentOptions.value;
        const description = form.productDescription.value;

        console.log(price, newStock);

        const isEmpty =
            (!price || parseInt(price) === selectedProduct.price) &&
            newStock === 0 &&
            (!minOrder || parseInt(minOrder) === selectedProduct.minimumOrderQuantity) &&
            paymentOptions === selectedProduct.paymentOptions &&
            description === selectedProduct.productDescription;

        if (isEmpty) {
            toast.error("Please change at least one field to update the product.");
            return;
        }

        const updatedProduct = {
            price: parseInt(price),
            newQuantity: selectedProduct.availableQuantity + newStock,
            minimumOrderQuantity: parseInt(minOrder),
            paymentOptions: paymentOptions,
            productDescription: description,
        };

        // console.log(updatedProduct);
        const res = await fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct),
        });

        if (res.ok) {
            toast.success(`Product updated! Added ${newStock} items to stock.`);
            const updatedProducts = myProducts.map(p => p._id === selectedProduct._id ? {
                ...p, price: updatedProduct.price,
                availableQuantity: updatedProduct.newQuantity,
                minimumOrderQuantity: updatedProduct.minimumOrderQuantity,
                paymentOptions: updatedProduct.paymentOptions,
                productDescription: updatedProduct.productDescription,
            }
                : p);
            setMyProducts(updatedProducts);
            handleCloseUpdateModal();
        }
        else
            toast.error("Failed to update!");
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
                filteredProducts.length > 0 ?
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
                                    <th className='text-black font-bold font-playfair'>AVAILABLE QUANTITY</th>
                                    <th className='text-black font-bold font-playfair'>PAYMENT MODE</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredProducts.map(product => (
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
                                                {product.availableQuantity}
                                            </td>
                                            <td>
                                                {product.paymentOptions.toUpperCase()}
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

                        {/* Add Stock */}
                        <div className="mt-3">
                            <label className="font-medium">Add Stock</label>
                            <input
                                type="number"
                                name="addStock"
                                min={0}
                                className="input w-full bg-[#fafafa]"
                                placeholder={`Current Stock: ${selectedProduct?.availableQuantity}`}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Enter the number of items to add to current stock.
                            </p>
                        </div>

                        {/* Minimum Order Quantity */}
                        <div className="mt-3">
                            <label className="font-medium">Minimum Order Quantity</label>
                            <input
                                type="number"
                                name="minimumOrderQuantity"
                                defaultValue={selectedProduct?.minimumOrderQuantity}
                                className="input w-full bg-[#fafafa]"
                            />
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

                        {/* Product Description */}
                        <div className="mt-3">
                            <label className="font-medium">Product Description</label>
                            <textarea
                                name="productDescription"
                                defaultValue={selectedProduct?.productDescription}
                                className="textarea textarea-lg w-full bg-[#fafafa] resize-none"
                            ></textarea>
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

export default ManageProducts;