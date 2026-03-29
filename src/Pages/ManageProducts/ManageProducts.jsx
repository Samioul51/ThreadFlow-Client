import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { IoIosArrowDropdown } from 'react-icons/io';
import { motion, useScroll } from "framer-motion"

const ManageProducts = () => {

    const { user, userToken } = use(AuthContext);
    const [myProducts, setMyProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { scrollYProgress } = useScroll();
    const [images, setImages] = useState([]);
    const [imagesToKeep, setImagesToKeep] = useState([]);
    const imgBB = import.meta.env.VITE_IMG_BB_API_KEY;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`);
                const data = await response.json();
                const products = data.data.filter(product => product.email === user.email);
                setMyProducts(products);
            } catch (error) {
                toast.error("Failed to load products! " + error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [user.email]);

    const categories = ["All", "Shirt", "Pant", "Jacket", "Accessories"];

    const [category, setCategory] = useState("All");
    const [searchTitle, setSearchTitle] = useState("");

    const filteredProducts = myProducts.filter(p => {
        const matchCategory = category === "All" ? true : p.category.toLowerCase() === category.toLowerCase();
        const matchTitle = p.productName.toLowerCase().includes(searchTitle.toLowerCase());
        return matchCategory && matchTitle;
    });

    // For deletion

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        document.getElementById("my_modal_5").showModal();
    }
    const handleCloseModal = () => {
        document.getElementById("my_modal_5").close();
        setSelectedProduct();
    }

    const handleProductDelete = async () => {
        if (!selectedProduct)
            return;
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${selectedProduct._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        if (!response.ok)
            throw new Error("Failed to delete product!");

        await response.json();
        const remaining = myProducts.filter(product => product._id !== selectedProduct._id);
        setMyProducts(remaining);
        toast.success("Product deleted successfully!");
        handleCloseModal();
    }

    // For update

    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        setImages([]);
        setImagesToKeep(product.images || []);
        document.getElementById("update_product_modal").showModal();
    }

    const handleCloseUpdateModal = () => {
        document.getElementById("update_product_modal").close();
        setSelectedProduct(null);
        setImages([]);
        setImagesToKeep([]);
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const existingCount = imagesToKeep.length;

        if (files.length + existingCount > 3) {
            toast.error("You can upload a maximum of 3 images!");
            return;
        }

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setImages(previews);
    };

    const uploadNewImages = async () => {
        const uploadedURLs = [];
        for (const img of images) {
            const formData = new FormData();
            formData.append("image", img.file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBB}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.success)
                uploadedURLs.push(data.data.url);
        }
        return uploadedURLs;
    }

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        if (!selectedProduct)
            return;

        const form = e.target;

        const price = form.price.value.trim() === "" ?
            selectedProduct.price
            :
            Number(form.price.value);
        const newStock = Number(form.addStock.value) || 0;
        const minOrder = form.minimumOrderQuantity.value.trim() === "" ?
            selectedProduct.minimumOrderQuantity
            :
            Number(form.minimumOrderQuantity.value);
        const paymentOptions = form.paymentOptions.value;
        const description = form.productDescription.value;

        let newImageURLs = [];

        if (images.length > 0)
            newImageURLs = await uploadNewImages();

        // console.log(price, newStock);

        const updatedImages = [...imagesToKeep, ...newImageURLs].slice(0, 3);

        const imagesChanged =
            updatedImages.length !== selectedProduct.images.length ||
            updatedImages.some((img, i) => img.url !== selectedProduct.images[i]);

        const isEmpty =
            (price === selectedProduct.price)
            &&
            (newStock === 0)
            &&
            (minOrder === selectedProduct.minimumOrderQuantity)
            &&
            (paymentOptions === selectedProduct.paymentOptions)
            &&
            (description === selectedProduct.productDescription)
            &&
            !imagesChanged;

        if (isEmpty) {
            toast.error("Please change at least one field to update the product.");
            return;
        }

        if (Number.isNaN(price)) {
            toast.error("Price must be a valid number!");
            return;
        }

        if (Number.isNaN(minOrder)) {
            toast.error("Minimum Order Quantity must be a valid number!");
            return;
        }

        if (Number.isNaN(newStock)) {
            toast.error("New Stock amount must be a valid number!");
            return;
        }

        const updatedProduct = {
            price: price,
            newQuantity: selectedProduct.availableQuantity + newStock,
            minimumOrderQuantity: minOrder,
            paymentOptions: paymentOptions,
            productDescription: description,
            images: updatedImages
        };

        // console.log(updatedProduct);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${selectedProduct._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify(updatedProduct),
        });

        if (res.ok) {
            const updatedProducts = myProducts.map(p => p._id === selectedProduct._id ? {
                ...p,
                ...updatedProduct
            }
                : p);
            setMyProducts(updatedProducts);
            handleCloseUpdateModal();
            toast.success("Product updated!");
        }
        else {
            handleCloseUpdateModal();
            toast.error("Product update failed!");
        }
    }

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
            <div className='py-5 px-3 mx-5 mt-10 flex flex-col items-center min-h-screen bg-white-bg font-inter'>
                <title>{`ThreadFlow | Manager - My Products`}</title>
                <p className='tf_heading font-playfair text-black text-3xl font-bold text-center mb-5'>MY PRODUCTS</p>
                <div className='w-full max-w-full flex-col lg:flex-row p-[16px] gap-2 lg:gap-0 box-border flex justify-between items-start lg:items-center'>
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
                    loading
                        ?
                        (
                            <div className="flex justify-center items-center my-10">
                                <span className="loading loading-spinner text-primary"></span>
                            </div>
                        )
                        :
                        (

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
                                                            <button onClick={() => handleOpenModal(product)} className="w-full btn btn-error">DELETE</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                                    <p className='font-playfair text-2xl text-center font-bold text-gray-500'>NO PRODUCTS FOUND!</p>
                                </div>

                        )

                }

                {/* Modal for deletion */}

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <p className="py-4">Are you sure you want to delete product?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={handleProductDelete} className="btn mr-2">Yes</button>
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
                                    className="input w-full bg-fafafa-bg"
                                />
                            </div>

                            {/* Add Stock */}
                            <div className="mt-3">
                                <label className="font-medium">Add Stock</label>
                                <input
                                    type="number"
                                    name="addStock"
                                    min={0}
                                    className="input w-full bg-fafafa-bg"
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
                                    className="input w-full bg-fafafa-bg"
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
                                    className="bg-fafafa-bg px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300w-full bg-fafafa-bg"
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
                                    className="textarea textarea-lg w-full bg-fafafa-bg resize-none"
                                ></textarea>
                            </div>

                            {/* Existing Images Preview */}
                            <div className="mt-4">
                                <label className="font-medium">Images</label>
                                <div className="grid grid-cols-3 gap-3 mt-2">
                                    {imagesToKeep?.map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative w-full h-24 border rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={img}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagesToKeep(prev => prev.filter((_, index) => index !== i));
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upload New Images */}
                            <div className='flex flex-col mb-3 mt-3'>
                                <label className="label mb-1 font-medium">Upload New Photos (Max 3)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input w-full bg-fafafa-bg"
                                />
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
        </>
    );
};

export default ManageProducts;