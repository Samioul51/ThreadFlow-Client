import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const orderPromise = fetch("http://localhost:3000/orders").then(res => res.json());
const productPromise=fetch("http://localhost:3000/products").then(res => res.json());

const UserProfile = () => {
    const { user, userData, logout } = use(AuthContext);
    const navigate = useNavigate();
    // console.log(user);
    // console.log(userData);
    const allOrders = use(orderPromise).data;

    const totalProducts= use(productPromise).data;
    // console.log(allOrders);
    const myOrders = allOrders.filter(order => order.email === user.email);
    const myProducts=totalProducts.filter(product=>product.email===user.email);
    const handleOpenModal = () => document.getElementById("my_modal_5").showModal();
    const handleCloseModal = () => document.getElementById("my_modal_5").close();

    const handleLogout = () => {
        handleCloseModal();
        navigate("/", { replace: true });
        logout().then(() => {
            toast.success("Logged out successfully!");
        }).catch((error) => {
            toast.error(error.message);
            handleCloseModal();
        })
    }

    console.log(userData);

    return (
        <div className='py-5 px-5 mx-10 mt-10 flex flex-col items-center bg-white font-inter'>
            <img src={user.photoURL} className='w-[150px] h-[150px] rounded-[50%] mb-10 border border-black' />
            <p className='font-playfair font-bold text-[40px] text-black text-center mb-10'>{user.displayName.toUpperCase()}</p>
            <div className="w-full max-w-[600px] self-center divider divider-neutral"></div>
            <div className='w-full max-w-[600px]'>
                <div className='flex justify-between mb-5'>
                    <p className='font-inter font-bold text-black'>FULL NAME</p>
                    <p className='font-medium font-inter text-[#666]'>{user.displayName.toUpperCase()}</p>
                </div>
                <div className="divider divider-neutral mb-5"></div>
            </div>
            <div className='w-full max-w-[600px]'>
                <div className='flex justify-between mb-5'>
                    <p className='font-inter font-bold text-black'>EMAIL</p>
                    <p className='font-medium font-inter text-[#666]'>{user.email}</p>
                </div>
                <div className="divider divider-neutral mb-5"></div>
            </div>
            {
                userData?.roleStatus === "pending" || userData?.roleStatus === "approved"
                    ?
                    <div className='w-full max-w-[600px]'>
                        <div className='flex justify-between mb-5'>
                            <p className='font-inter font-bold text-black'>ACCOUNT STATUS</p>
                            {
                                userData?.roleStatus === "pending" ?
                                    <p className='font-medium font-inter text-blue-500'>PENDING</p>
                                    :
                                    <p className='font-medium font-inter text-green-500'>APPROVED</p>
                            }
                        </div>
                        <div className="divider divider-neutral mb-5"></div>
                    </div>
                    :
                    <div className='w-full max-w-[600px]'>
                        <div>
                            <div className='flex justify-between mb-5'>
                                <p className='font-inter font-bold text-black'>ACCOUNT STATUS</p>
                                <p className='font-medium font-inter text-red-500'>SUSPENDED</p>
                            </div>
                            <div className="divider divider-neutral mb-5"></div>
                        </div>
                        <div>
                            <div className='flex justify-between mb-5'>
                                <p className='font-inter font-bold text-black'>SUSPENSION FEEDBACK</p>
                                <p className='font-medium font-inter text-gray-500'>{userData?.feedback}</p>
                            </div>
                            <div className="divider divider-neutral mb-5"></div>
                        </div>
                    </div>
            }

            {/* <div className='w-full max-w-[600px]'>
                <div className='flex justify-between mb-5'>
                    <p className='font-inter font-bold text-black'>ACCOUNT STATUS</p>
                    {
                        userData?.roleStatus === "pending" ?
                            <p className='font-medium font-inter text-green-500'>APPROVED</p>
                            :
                            <div className='flex flex-col gap-1'>
                                <p className='font-medium font-inter text-red-500'>SUSPENDED</p>
                                <p className='font-medium font-inter text-blue-500 text-justify'>{userData.feedback}</p>
                            </div>
                            
                    }
                </div>
                <div className="divider divider-neutral mb-5"></div>
            </div> */}
            <div className='w-full max-w-[600px]'>
                <div className='flex justify-between mb-5'>
                    <p className='font-inter font-bold text-black'>USER TYPE</p>
                    <p className='font-medium font-inter text-[#666]'>{userData?.role.toUpperCase()}</p>
                </div>
                <div className="divider divider-neutral mb-5"></div>
            </div>
            <div className='w-full max-w-[600px]'>
                <div className='flex justify-between mb-5'>
                    <p className='font-inter font-bold text-black'>MEMBER SINCE</p>
                    <p className='font-medium font-inter text-[#666]'>{userData?.createdAt.split("T")[0]}</p>
                </div>
                <div className="divider divider-neutral mb-5"></div>
            </div>
            {
                userData?.role === "buyer" && <div className='w-full max-w-[600px] mb-10'>
                    <div className='flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>TOTAL ORDERS</p>
                        <p className='font-medium font-inter text-[#666]'>{myOrders.length}</p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
            }
            {
                userData?.role === "manager" && <div className='w-full max-w-[600px] mb-10'>
                    <div className='flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>TOTAL PRODUCTS</p>
                        <p className='font-medium font-inter text-[#666]'>
                            {myProducts.length}
                        </p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
            }

            <button className='text-white bg-black rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer hover:bg-gray-800 transition-colors ease-in-out duration-500' onClick={handleOpenModal}>Logout</button>
            {/* Modal for logout */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleLogout} className="btn">Yes</button>
                            <button onClick={handleCloseModal} className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UserProfile;