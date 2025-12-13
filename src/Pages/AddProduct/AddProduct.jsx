import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';

const AddProduct = () => {
    const {user,userData}=use(AuthContext);
    const [images,setImages]=useState([]);
    const imgBB=import.meta.env.VITE_IMG_BB_API_KEY;

    const handleImageChange=(e)=>{
        const files=Array.from(e.target.files);
        if(files.length>3){
            toast.error("You can upload a maximum of 3 images!");
            return;
        }

        const previews=files.map(file=>(
            {
                file,
                url:URL.createObjectURL(file)
            }
        ));
        
        setImages(previews);
    }

    const upload=async()=>{
        const uploadedURLs=[];
        for(const img of images){
            const formData=new FormData();
            formData.append("image",img.file);

            const res=await fetch(`https://api.imgbb.com/1/upload?key=${imgBB}`,{
                method:"POST",
                body:formData
            });

            const data=await res.json();
            uploadedURLs.push(data.data.url);
        }
        return uploadedURLs;
    }

    const handleAddProduct=async(e)=>{
        e.preventDefault();
        const form=e.target;

        const imageURLs=await upload();

        const newProduct={
            productName:form.productName.value,
            productDescription:form.productDescription.value,
            category:form.category.value,
            price:Number(form.price.value),
            availableQuantity:Number(form.availableQuantity.value),
            minimumOrderQuantity:Number(form.minimumOrderQuantity.value),
            paymentOptions:form.paymentOptions.value,
            images:imageURLs,
            email:user.email,
            showOnHome:form.showOnHome.value
        }

        const res=await fetch("http://localhost:3000/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });

        if(res.ok){
            toast.success("Product added successfully!");
            form.reset();
            setImages([]);
        }
        else
            toast.error("Failed to add product!");
        
        console.log(newProduct);
    }

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>ADD NEW PRODUCT</p>
            <form className='w-full max-w-[500px]' onSubmit={handleAddProduct}>
                    {/* Product Name */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Product Name</label>
                        <input type="text" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="productName" placeholder="Enter product name" required />
                    </div>
                    {/* Category */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Select Category</label>
                        <select
                            className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                            name="category"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="shirt">Shirt</option>
                            <option value="pant">Pant</option>
                            <option value="jacket">Jacket</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>
                    {/* Price */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Price (BDT)</label>
                        <input type="number" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="price" placeholder="Enter price" min={10} required />
                    </div>
                    {/* Available Quantity */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Available Quantity</label>
                        <input type="number" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="availableQuantity" placeholder="Enter available quantity" min={10} required />
                    </div>
                    {/* Minimum Order Quantity */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Minimum Order Quantity</label>
                        <input type="number" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="minimumOrderQuantity" placeholder="Enter minimum order quantity" min={10} required />
                    </div>
                    {/* Payment Option */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Select Payment Option</label>
                        <select
                            className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                            name="paymentOptions"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Select a payment option
                            </option>
                            <option value="Stripe">Stripe</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
    
                        </select>
                    </div>
                    {/* Product Description */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Product Description</label>
                        <textarea placeholder="Enter product description" className="textarea textarea-xl w-full bg-[#fafafa] px-[14px] py-[19px] text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 resize-none" name="productDescription"></textarea>

                    </div>
                    {/* Product Image */}
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Upload Photos (Max 3)</label>
                        <input 
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                         className="file-input bg-[#fafafa] w-full"
                         required />
                    </div>
                    
                    {/* Preview section */}
                    {
                        images.length>0 && (
                            <div className='grid grid-cols-3 gap-3 mb-5'>
                                {
                                    images.map((img,index)=>(
                                        <div key={index} className='w-full h-24 border rounded-lg overflow-hidden'>
                                            <img src={img.url}
                                            className='w-full h-full object-cover'/>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Show On Homepage</label>
                        <input type="text" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="showOnHome" value={"false"}  readOnly />
                    </div>

                    {
                        userData?.roleStatus==="suspended"
                        ?
                        <div className='w-full p-2 border border-solid border-red-400 bg-[#f0fff4] text-center text-red-600 font-medium mb-5'>YOU ARE SUSPENDED SO CAN'T ADD PRODUCTS!</div>
                        :
                        <button type="submit" className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer mb-[24px]'>
                        Add Product
                    </button>
                    }
                    
                </form>
        </div>
    );
};

export default AddProduct;