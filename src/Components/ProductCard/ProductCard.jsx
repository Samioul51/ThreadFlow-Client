import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const {images,productName,category,price,availableQuantity} = product;
    
    return (
        <div>
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden mx-auto font-inter">
                {/* Product Image */}
                <div className="bg-gray-200 flex items-center aspect-square w-full">
                    <img src={images[0]} alt={productName} className="h-full w-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">{productName}</h3>
                    <p className="text-gray-500 text-sm">{category}</p>
                    <p className="text-2xl font-bold">৳ {price}</p>
                    <p className="text-gray-500 text-sm"><span className="text-black font-medium">In Stock: {availableQuantity}</span></p>

                    {/* Button */}
                    <Link
                        to="#"
                        className="mt-2 bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;