import { Link } from "react-router";
import { motion } from 'motion/react';

const ProductCard = ({ product }) => {
    const { _id, images, productName, category, price, availableQuantity } = product;
    // console.log(_id);
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-full"
        >
            <div className="w-full h-full flex flex-col bg-white-bg shadow-lg rounded-lg overflow-hidden mx-auto font-inter">
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                    <img
                        src={images[0]}
                        alt={productName}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">{productName}</h3>
                    <p className="text-gray-500 text-sm">{category.toUpperCase()}</p>
                    <p className="text-2xl font-bold">৳ {price}</p>
                    <p className="text-gray-500 text-sm"><span className="text-black font-medium">In Stock: {availableQuantity}</span></p>

                    {/* Button */}
                    <Link
                        to={`/products/${_id}`}
                        className="mt-auto bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};


export default ProductCard;