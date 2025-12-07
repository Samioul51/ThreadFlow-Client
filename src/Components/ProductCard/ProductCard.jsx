import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const {name,username,email,phone,website} = product;
    
    return (
        <div>
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
                {/* Product Image */}
                <div className="bg-gray-200 flex items-center justify-center h-48">
                    <img alt={name} className="h-24 w-24 object-contain" />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-gray-500 text-sm">{username}</p>
                    <p className="text-2xl font-bold">${username}</p>

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